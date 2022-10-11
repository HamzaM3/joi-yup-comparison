import Joi from 'joi'
import * as Yup from 'yup'
import { randomAlphabeticString, randomArray } from './randomInput';
import { testJoiYupValidation } from './testHelpers'

describe('Joi.object vs Yup.object', () => {
    const schJoi = Joi.object();
    const schYup = Yup.object();

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

    it('both validate {}', () => {
        answers({}, true, true)
    })

    it('both invalidate []', () => {
        answers([], false, false)
    })

    it('both invalidate ""', () => {
        answers("", false, false)
    })

    it('both invalidate 0', () => {
        answers(0, false, false)
    })

    it('both invalidate primitive types', () => {
        answers(randomAlphabeticString(), false, false)
        answers(Math.random() * 1000, false, false)
        answers(Symbol(), false, false)
    })

    it('Joi invalidates / Yup validates functions', () => {
        answers(() => "output", false, true)
    })

    it('both invalidate arrays', () => {
        answers(randomArray(), false, false)
    })

    it('Joi invalidates / Yup validates arrays with a Symbol.toStringTag === "Object"', () => {
        let x = randomArray();
        x[Symbol.toStringTag] = "Object"
        answers(x, false, true)
    })

    it('Joi validates / Yup invalidates Maps', () => {
        answers(new Map(), true, false)
    })

    it('Joi validates / Yup invalidates nearly all built-in object', () => {
        answers(new URIError(), true, false)
        answers(new RegExp(), true, false)
        answers(new Set(), true, false)
        answers(new Promise(() => {}), true, false)
        // answers(new Proxy({}, {}), true, false) // Works
        answers(new Number(), true, false)
        answers(new Error(), true, false)
    })

    it('Joi validates / Yup invalidates any object with Symbol.toStringTag !== "Object"', () => {
        const object = { a: 2, b: 7 }
        answers(object, true, true)

        Object.getPrototypeOf(object)[Symbol.toStringTag] = "Not an object"
        answers(object, true, false)
    })
})