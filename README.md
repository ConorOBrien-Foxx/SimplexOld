# Simplex
**Simplex** is a golf-based (i.e. esoteric) programming language that is in its developing stages. It is driven to be somewhat effective at a majority of golfing challenges while retaining its intuitive nature.

# Features
## Strip-/Tape-Based Language
Simplex features a right-open memory tape (the term &ldquo;strip&rdquo; is also used synonymously), and can be compared to Brain**** in that it allows you to traverse this memory tape. The commands to traverse left and right are `L` and `R`, respectively. Traversing to a negative position isn't disallowed, but may/will result in buggy behaviour with other commands.

## Pre- and regular-processed commands.
Simplex features two parsing phases: a pre-proccessing phase and a regular processing phase. In the pre-processing phase, there are two main things going on, besides internal preinitalizations:

 1. Single-line comments are removed. That is,  `s/(.+?)~~.+$/$1/g`. 
 2. Compression fields are removed. A compression field is something of the form `(.+)(\d+)`, that is, (stuff)N, where N is a number. It simply repeats the expression N times. Currently, only linear i.e. non-stacked compression fields are supported. An example would be `(RR)5 => RRRRRRRRRR`.

All other commands (including inline comments `!...!`) are proccessed during parsing.

# Commands
