import Joi from 'joi'
import * as Yup from 'yup'
import { testJoiYupValidation } from './testHelpers'
import { randomArray, randomNumberObject, randomAlphabeticString } from './randomInput'

describe('Joi.number vs Yup.number', () => {
    const schJoi = Joi.number();
    const schYup = Yup.number();

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

    it('both invalidate []', () => {
        answers([], false, false)
    })

    it('both invalidate ""', () => {
        answers("", false, false)
    })

    it('both validate 0', () => {
        answers(0, true, true)
    })

    it('both validate any safe number (btw MAX_SAFE_INTEGER and MIN_SAFE_INTEGER)', () => {
        answers(Number.MAX_SAFE_INTEGER, true, true)
        answers(Number.MIN_SAFE_INTEGER, true, true)
        answers(Number.MAX_SAFE_INTEGER + 1, false, true)
        answers(Number.MIN_SAFE_INTEGER - 1, false, true)

    })

    it('Joi invalidates / Yup validates MAX_VALUE', () => {
        answers(Number.MAX_VALUE, false, true)
        answers(-Number.MAX_VALUE, false, true)
    })

    it('both validate MIN_VALUE', () => {
        answers(Number.MIN_VALUE, true, true)
    })

    it('both invalidate NaN', () => {
        answers(NaN, false, false)
    })

    it('Joi invalidates / Yup validates Infinity', () => {
        answers(Infinity, false, true)
        answers(-Infinity, false, true)
    })

    it('both validate random numbers', () => {
        for (let i = 0; i < 10; i++) {
            let x = 2 * (Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2)
            answers(x, true, true)
        }
    })

    it('both validate random number strings', () => {
        for (let i = 0; i < 10; i++) {
            let x = 2 * (Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2)
            answers(x.toString(), true, true)
        }
    })

    it('Joi invalidates / Yup validates Number.MIN_VALUE.toString()', () => {
        answers(Number.MIN_VALUE.toString(), false, true) // But MIN_VALUE is safe ?
        answers((2 * Number.MIN_VALUE).toString(), true, true)
        answers(Number.EPSILON.toString(), true, true)
    })

    it('(!) Joi invalidates / Yup validates arrays of numbers', () => {
        for (let i = 0; i < 10; i++) {
            // console.log(randomArray().toString()) // a bug
            answers(randomArray(), false, true)
        }
    })

    it('both invalidate random alphabetical strings', () => {
        for (let i = 0; i < 10; i++) {
            answers(randomAlphabeticString(), false, false)
        }
    })

    it('both invalidate random objects with number value', () => {
        for (let i = 0; i < 10; i++) {
            answers(randomNumberObject(), false, false)
        }
    })
})
