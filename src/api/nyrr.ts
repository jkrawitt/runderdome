import axios from 'axios'

export interface NyrrApiData {
  totalItems: number
  items: RaceResult[]
}

export interface RaceResult {
  age: number
  ageGradePercent: number
  ageGradePlace: number
  ageGradeTime: string
  bib: string
  city: string
  countryCode: string
  firstName: string
  gender: string
  genderPlace: number
  iaaf: string
  lastName: string
  overallPlace: number
  overallTime: string
  pace: string
  racesCount: number
  runnerId: number
  stateProvince: string
}

export default async (endpoint: string, data: object) => {
  const baseUrl = 'https://rmsprodapi.nyrr.org/api/v2'
  const url = `${baseUrl}/${endpoint}`

  const response = await axios.post(url, data, {
    headers: {
      accept: 'application/json, text/plain, */*',
    },
  })

  return response
}
