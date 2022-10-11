import Joi from 'joi'
import * as Yup from 'yup'
import { randomAlphabeticString, randomNumberObject, randomArray } from './randomInput'

describe('Joi.any vs Yup.mixed', () => {
    const schJoi = Joi.any()
    const schYup = Yup.mixed()

    it('validate null', () => {
        expect(schJoi.validate(null)).toEqual({ value:null, error:undefined })
        expect(schYup.validateSync(null)).toEqual(null)
    })

    it('validate undefined', () => {
        expect(schJoi.validate(undefined)).toEqual({ value:undefined, error:undefined })
        expect(schYup.validateSync(undefined)).toEqual(undefined)
    })

    it('validate true', () => {
        expect(schJoi.validate(true)).toEqual({ value:true, error:undefined })
        expect(schYup.validateSync(true)).toEqual(true)
    })

    it('validate false', () => {
        expect(schJoi.validate(false)).toEqual({ value:false, error:undefined })
        expect(schYup.validateSync(false)).toEqual(false)
    })

    it('validate 0', () => {
        expect(schJoi.validate(0)).toEqual({ value:0, error:undefined })
        expect(schYup.validateSync(0)).toEqual(0)
    })

    it('validate {}', () => {
        expect(schJoi.validate({})).toEqual({ value:{}, error:undefined })
        expect(schYup.validateSync({})).toEqual({})
    })

    it('validate []', () => {
        expect(schJoi.validate([])).toEqual({ value:[], error:undefined })
        expect(schYup.validateSync([])).toEqual([])
    })

    it('validate the empty string', () => {
        expect(schJoi.validate('')).toEqual({ value:'', error:undefined })
        expect(schYup.validateSync('')).toEqual('')
    })

    it('validate random numbers', () => {
        for (let i = 0; i < 20; i++){
            let x = Math.random() * 1000000
            expect(schJoi.validate(x)).toEqual({ value:x, error:undefined })
            expect(schYup.validateSync(x)).toEqual(x)
        }
    })

    it('validate strings', () => {
        for (let i = 0; i < 20; i++){
            let x = randomAlphabeticString()
            expect(schJoi.validate(x)).toEqual({ value:x, error:undefined })
            expect(schYup.validateSync(x)).toEqual(x)
        }
    })

    it('validate number strings', () => {
        for (let i = 0; i < 20; i++){
            let x = Math.random() * 1000000
            expect(schJoi.validate(x.toString())).toEqual({ value:x.toString(), error:undefined })
            expect(schYup.validateSync(x.toString())).toEqual(x.toString())
        }
    })

    it('validate random objects', () => {
        for (let i = 0; i < 20; i++){
            let x = randomNumberObject()
            expect(schJoi.validate(x)).toEqual({ value:x, error:undefined })
            expect(schYup.validateSync(x)).toEqual(x)
        }
    })

    it('validate objects with toString', () => {
        for (let i = 0; i < 20; i++){
            let x = randomNumberObject()
            x.toString = randomNumberObject
            expect(schJoi.validate(x)).toEqual({ value:x, error:undefined })
            expect(schYup.validateSync(x)).toEqual(x)
        }
    })

    it('validate arrays', () => {
        for (let i = 0; i < 20; i++){
            let x = randomArray()
            expect(schJoi.validate(x)).toEqual({ value:x, error:undefined })
            expect(schYup.validateSync(x)).toEqual(x)
        }
    })
})