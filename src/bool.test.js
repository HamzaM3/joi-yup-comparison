import Joi from 'joi'
import * as Yup from 'yup'
import { testJoiYupValidation } from './testHelpers'
import { randomAlphabeticString, randomNumberObject, randomArray } from './randomInput'

describe('Joi.bool vs Yup.bool', () => {
    const schJoi = Joi.bool();
    const schYup = Yup.bool();

    const answers = (val, expectedJoi, expectedYup) => (
        testJoiYupValidation(schJoi, schYup, val, expectedJoi, expectedYup)
    );

    it('both invalidate null', () => {
        answers(null, false, false)
    })

    it('both validate undefined', () => {
        answers(undefined, true, true)
    })

    it('both validate true', () => {
        answers(true, true, true)
    })

    it('both validate false', () => {
        answers(false, true, true)
    })

    it('both invalidate {}', () => {
        answers({}, false, false)
    })

    it('both invalidate []', () => {
        answers([], false, false)
    })

    it('both invalidate ""', () => {
        answers("", false, false)
    })

    it('Joi invalidates / Yup validates 0', () => {
        answers(0, false, true)
    })

    it('Joi invalidates / Yup validates 1', () => {
        answers(1, false, true)
    })

    it('both validate "true"', () => {
        answers("true", true, true)
    })

    it('both validate "false"', () => {
        answers("false", true, true)
    })

    it('Joi invalidates / Yup validates object with toString() = "true"', () => {
        answers({ toString: () => "true" }, false, true)
    })

    it('Joi invalidates / Yup validates object with toString() = "false"', () => {
        answers({ toString: () => "false" }, false, true)
    })

    it('Joi invalidates / Yup validates object with toString() = "0"', () => {
        answers({ toString: () => "0" }, false, true)
    })

    it('Joi invalidates / Yup validates object with toString() = "1"', () => {
        answers({ toString: () => "1" }, false, true)
    })

    it('both invalidate object with toString() neither "true", "false", "0" or "1"', () => {
        answers({ toString: () => randomAlphabeticString() }, false, false)
    })

    it('both invalidate anything else', () => {
        answers(randomNumberObject(), false, false)
        answers(Math.random()* 100 + 1.01, false, false)
        answers(Math.random()* -100 - 0.01, false, false)
        answers(randomAlphabeticString(), false, false)
        answers(randomArray(), false, false)
    })
})