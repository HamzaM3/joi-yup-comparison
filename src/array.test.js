import Joi from 'joi'
import * as Yup from 'yup'
import { randomArray, randomNumberObject, randomAlphabeticString } from './randomInput';
import { testJoiYupValidation } from './testHelpers'

describe('Joi.array vs Yup.array', () => {
    const schJoi = Joi.array();
    const schYup = Yup.array();

    const answers = (val, expectedJoi, expectedYup) => (
        testJoiYupValidation(schJoi, schYup, val, expectedJoi, expectedYup)
    );

    it('both invalidate null', () => {
        answers(null, false, false)
    })

    it('both validate undefined', () => {
        answers(undefined, true, true)
    })

    it('both invalidate true', () => {
        answers(true, false, false)
    })

    it('both invalidate false', () => {
        answers(false, false, false)
    })

    it('both invalidate {}', () => {
        answers({}, false, false)
    })

    it('both validate []', () => {
        answers([], true, true)
    })

    it('both invalidate ""', () => {
        answers("", false, false)
    })

    it('both invalidate 0', () => {
        answers(0, false, false)
    })

    it('both validate random arrays', () => {
        answers(randomArray(), true, true)
    })

    it('both invalidate anything else', () => {
        answers(randomNumberObject(), false, false)
        answers(Math.random()* 100 + 1.01, false, false)
        answers(Math.random()* -100 - 0.01, false, false)
        answers(randomAlphabeticString(), false, false)
    })
})