initSidebarItems({"enum":[["Equal","A potential output from `Cmp`, this is the type equivalent to the enum variant `core::cmp::Ordering::Equal`."],["Greater","A potential output from `Cmp`, this is the type equivalent to the enum variant `core::cmp::Ordering::Greater`."],["Less","A potential output from `Cmp`, this is the type equivalent to the enum variant `core::cmp::Ordering::Less`."]],"mod":[["bit","Type-level bits. These are rather simple and are used as the building blocks of the other number types in this crate.**Type operators** implemented:From core::ops: `BitAnd`, `BitOr`, `BitXor`, and `Not`. From typenum: `Same` and `Cmp`."],["consts","This module defines aliases for many constants. It is generated by typenum's build script.For unsigned integers, the format is `U` followed by the number. We define aliases forNumbers 0 through 1024 Powers of 2 below u64::MAX Powers of 10 below u64::MAX These alias definitions look like this:For positive signed integers, the format is `P` followed by the number and for negative signed integers it is `N` followed by the number. For the signed integer zero, we use `Z0`. We define aliases forNumbers -1024 through 1024 Powers of 2 between i64::MIN and i64::MAX Powers of 10 between i64::MIN and i64::MAX These alias definitions look like this:Example"],["int","Type-level signed integers.**Type operators** implemented:From core::ops: `Add`, `Sub`, `Mul`, `Div`, and `Rem`. From typenum: `Same`, `Cmp`, and `Pow`.Rather than directly using the structs defined in this module, it is recommended that you import and use the relevant aliases from the consts module.Note that operators that work on the underlying structure of the number are intentionally not implemented. This is because this implementation of signed integers does *not* use twos-complement, and implementing them would require making arbitrary choices, causing the results of such operators to be difficult to reason about.Example"],["marker_traits","These are all of the **marker traits** used in typenum. Note that the definition here for marker traits is slightly different than the conventional one --- we include traits with functions that convert a type to the corresponding value.For example, the `Integer` trait includes the function (among others) `fn to_i32() -> i32` so that one can do this:"],["operator_aliases","This module provides aliases for the type operators used in this crate. Their purpose is to increase the ergonomics of performing operations on the types defined here.For example, type `X` and type `Y` are the same here:"],["type_operators","This module provides useful **type operators** that are not defined in `core`."],["uint","Type-level unsigned integers.*Type operators** implemented:From core::ops: `BitAnd`, `BitOr`, `BitXor`, `Shl`, `Shr`, `Add`, `Sub`, `Mul`, `Div`, and `Rem`. From typenum: `Same`, `Cmp`, and `Pow`.Rather than directly using the structs defined in this module, it is recommended that you import and use the relevant aliases from the consts module.Example"]]});