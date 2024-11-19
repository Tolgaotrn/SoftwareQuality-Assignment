// import {Assessment} from "./assesment";
// import {AssessmentType} from "./enums";
//
// export class AssessmentUtils {
//     // Check for overlapping dates
//     static checkOverlap(assessments: Assessment[]): boolean {
//         const dates = assessments.map(a => a.date.getTime())
//         const uniqueDates = new Set(dates)
//         if (dates.length !== uniqueDates.size) {
//             throw new Error('Overlapping assessment dates found')
//         }
//         return true
//     }
//
//     // Ensure submission times are uniform (e.g., 11:59 p.m.)
//     static ensureUniformSubmissionTime(assessments: Assessment[]): boolean {
//         const targetTime = '23:59'
//         assessments.forEach(a => {
//             if (a.type === AssessmentType.WORK_DELIVERY && a.time !== targetTime) {
//                 throw new Error('Submission time must be uniform (e.g., 23:59)')
//             }
//         })
//         return true
//     }
// }
