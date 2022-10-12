# Joi vs Yup comparison

It is important to say that in general it would be assumed that the input is a JSON-able object.
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

## Validation methods

We do two types of actions : testing and parsing

The vast majority of available actions are testing and very few parsing.

The libraries have all the basic methods in common, but they have both their own.

### Philosophies

Yup : cast -> parse -> test
- Proof: they say it and previous tests

Joi : typetest -> validations (= parse + test) [-> cast]
- Proof: `custom` method

Me : typetest -> parse -> test [-> cast]
- Because it is unexpected to see numbers become strings and 0 become false (as far as I am concerned)

## Order of parsing / testing

It has to be made clear that testing purely doesn't require ordering as each test takes the same input and can be done at the same time and then combined.

**Joi:** I still don't understand but they say this:
> Rules are defined in an additive fashion and evaluated in order, first the inclusive rules, then the exclusive rules.

What are inclusive and exclusive rules ? And want kind is custom ?

I feel it's left to right but I found some contradictions.

**Yup:** They say it: parse -> tests

And the parsing goes from left to right.

!! Parsing methods like `lowercase` etc. split in two. They parse the input and then they come back to test if it verifies the property.
