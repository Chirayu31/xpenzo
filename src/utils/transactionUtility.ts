export function startOfDay(date: Date): Date {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export function startOfMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setDate(1)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export function startOfYear(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(0, 1)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}
