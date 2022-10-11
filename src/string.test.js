import Joi from 'joi'
import * as Yup from 'yup'
import { testJoiYupValidation } from './testHelpers'
import { randomAlphabeticString, randomArray, randomNumberObject } from './randomInput'

describe('Joi.string vs Yup.string', () => {
    const schJoi = Joi.string();
    const schYup = Yup.string();

    const answers = (val, expectedJoi, expectedYup) => (
        testJoiYupValidation(schJoi, schYup, val, expectedJoi, expectedYup)
    );

    it('both invalidate null', () => {
        answers(null, false, false)
    })

    it('both validate undefined', () => {
        answers(undefined, true, true)
    })

    it('Joi invalidates / Yup validates true', () => {
        answers(true, false, true)
    })

    it('Joi invalidates / Yup validates false', () => {
        answers(true, false, true)
    })

    it('both invalidate {}', () => {
        answers({}, false, false)
    })

    it('both invalidate []', () => {
        answers([], false, false)
    })

    it('Joi invalidates / Yup validates ""', () => {
        answers("", false, true)
    })

    it('Joi invalidates / Yup validates 0', () => {
        answers(0, false, true)
    })

    it('both validate random strings', () => {
        answers(randomAlphabeticString(), true, true)
    })

    it('both invalidate arrays', () => {
        answers(randomArray(), false, false)
    })

    it('both invalidate random arrays with toString', () => {
        for (let i = 0; i < 20; i++){
            let x = randomArray()
            x.toString = randomAlphabeticString
            answers(x, false, false)
        }
    })

    it('Joi invalidates / Yup validates numbers', () => {
        answers(Math.random() * 1000, false, true)
    })

    it('both invalidate random objects', () => {
        for (let i = 0; i < 20; i++){
            let x = randomNumberObject()
            answers(x, false, false)
        }
    })

    it('Joi invalidates / Yup validates random objects with toString (that returns a string)', () => {
        for (let i = 0; i < 20; i++){
            let x = randomNumberObject()
            x.toString = randomAlphabeticString
            answers(x, false, true)

            x.toString = randomNumberObject
            answers(x, false, false)
        }
    })

    
})