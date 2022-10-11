import { expect } from '@jest/globals'

function testJoiYupValidation(schJoi, schYup, val, expectedJoiAnswer, expectedYupAnswer) {
    if (expectedJoiAnswer)
        expect(schJoi.validate(val).error).toBeUndefined();
    else
        expect(schJoi.validate(val).error).not.toBeUndefined();


    if (expectedYupAnswer)
        expect(() => schYup.validateSync(val)).not.toThrow();
    else
        expect(() => schYup.validateSync(val)).toThrow();
}

module.exports = { testJoiYupValidation }
