# Joi vs Yup comparison

## Validation methods

To summarize:

schema.validate === schema.validateAsync

schema.validateSync === Joi.attempt

## Core schemas

`undefined` accepted by everyone

`null`refused by everyone (except any/mixed)

### any / mixed

They both accept anything

### bool

Yup test : `/^(true|false|0|1)$/.test(x.toString())`  (modulo a `valueOf` if it's an instance of `Boolean`)

Joi test: either `true`, `false`, `"true"` or `"false"`

### number

They both parse strings for numbers and exclude NaN

Joi only accepts "safe numbers"

Little bug in Yup : it accepts arrays that start with numbers

### objects

Yup test: `Object.prototype.toString.call(x) === [object Object] || typeof x === "function"`

Which means that if someone modifies `x[Symbol.toStringTag]`to be `"Object"` then they can pretend to be objects (even if it's a primitive type)


I think Joi tests : `typeof === "object" && !Array.isArray(x)` (plus `null` and `undefined` tests)

### string

It has to be made clear that Yup seeks to parse the entry before testing it.

So it makes sense that `string`is going to use `toString` on anything it can

Which means that all the types are accepted by `string` except `Array`s (intentionnally)

Joi on the other hand tests whether the entry is of type `string`

### array

Array works perfectly, they just do an `Array.isArray`
