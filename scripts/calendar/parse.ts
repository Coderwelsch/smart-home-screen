import ical from "ical.js"
import Time from "ical.js/dist/types/time"
import { CalEvent } from "./types"

const getRecurringEventIterations = (vevents: ical.Component[]): CalEvent[] => {
	return vevents.reduce((acc, vEvent) => {
		const event = new ical.Event(vEvent)

		if (!event.isRecurring()) {
			return acc
		}

		const dtstart = vEvent.getFirstPropertyValue("dtstart") as Time | null
		const recur = vEvent.getFirstPropertyValue("rrule") as ical.Recur | null

		if (!recur || !dtstart) {
			return acc
		}

		const iterator = recur.iterator(dtstart)

		const rangeStart = ical.Time.now()

		const rangeEnd = ical.Time.now()
		rangeEnd.addDuration(ical.Duration.fromData({ weeks: 1 }))

		for (
			let nextOccurence = iterator.next();
			nextOccurence && nextOccurence.compare(rangeEnd) < 0;
			nextOccurence = iterator.next()
		) {
			if (nextOccurence.compare(rangeStart) < 0) {
				continue
			}

			const newEvent = new ical.Event(vEvent)
			const startDate = nextOccurence.clone()
			const endDate = startDate.clone()
			endDate.addDuration(newEvent.duration)

			const eventData: CalEvent = {
				summary: newEvent.summary,
				startDate: startDate.toJSDate(),
				endDate: endDate.toJSDate(),
				allDay: newEvent.startDate.isDate,
			}

			acc.push(eventData)
		}

		return acc
	}, [] as CalEvent[])
}

export const parse = (calData: string) => {
	const jcalData = ical.parse(calData)
	const comp = new ical.Component(jcalData)
	const vevents = comp.getAllSubcomponents("vevent")
	const recurringEvents = getRecurringEventIterations(vevents)

	const mappedNormalEvents: CalEvent[] = vevents.map((vevent) => {
		const event = new ical.Event(vevent)

		return {
			summary: event.summary,
			startDate: event.startDate.toJSDate(),
			endDate: event.endDate.toJSDate(),
		}
	})

	const sortedEvents = [...recurringEvents, ...mappedNormalEvents].sort(
		(a, b) => a.startDate.getTime() - b.startDate.getTime(),
	)

	return sortedEvents
}