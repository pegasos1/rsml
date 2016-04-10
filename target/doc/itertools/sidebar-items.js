initSidebarItems({"enum":[["Diff","A type returned by the `diff_with` function.`Diff` represents the way in which the elements yielded by the iterator `I` differ to some iterator `J`."],["EitherOrBoth","A value yielded by `ZipLongest`. Contains one or two values, depending on which of the input iterators are exhausted.See *.zip_longest()* for more information."]],"fn":[["assert_equal","Assert that two iterators produce equal sequences, with the same semantics as *equal(a, b)*.**Panics** on assertion failure with a message that shows the two iteration elements."],["diff_with","Compares every element yielded by both `i` and `j` with the given function in lock-step and returns a `Diff` which describes how `j` differs from `i`.If the number of elements yielded by `j` is less than the number of elements yielded by `i`, the number of `j` elements yielded will be returned along with `i`'s remaining elements as `Diff::Shorter`.If the two elements of a step differ, the index of those elements along with the remaining elements of both `i` and `j` are returned as `Diff::FirstMismatch`.If `i` becomes exhausted before `j` becomes exhausted, the number of elements in `i` along with the remaining `j` elements will be returned as `Diff::Longer`."],["equal","Return `true` if both iterators produce equal sequences (elements pairwise equal and sequences of the same length), `false` otherwise.**Note:** the standard library method `Iterator::eq` now provides the same functionality."],["linspace","Return an iterator of evenly spaced floats.The `Linspace` has `n` elements, where the first element is `a` and the last element is `b`.Iterator element type is `F`, where `F` must be either `f32` or `f64`."],["partition","Partition a sequence using predicate `pred` so that elements that map to `true` are placed before elements which map to `false`.The order within the partitions is arbitrary.Return the index of the split point."]],"macro":[["iproduct!","Create an iterator over the “cartesian product” of iterators.Iterator element type is like `(A, B, ..., E)` if formed from iterators `(I, J, ..., M)` with element types `I::Item = A`, `J::Item = B`, etc."],["izip!","Create an iterator running multiple iterators in lockstep.The izip! iterator yields elements until any subiterator returns `None`.Iterator element type is like `(A, B, ..., E)` if formed from iterators `(I, J, ..., M)` implementing `I: Iterator<A>`, `J: Iterator<B>`, ..., `M: Iterator<E>`"]],"mod":[["free","Free functions that create iterator adaptors or call iterator methods.The benefit of free functions is that they accept any `IntoIterator` as argument, so the resulting code may be easier to read."],["misc","A module of helper traits and iterators that are not intended to be used directly."],["size_hint","Arithmetic on **Iterator** *.size_hint()* values."]],"struct":[["Batching","A “meta iterator adaptor”. Its closure recives a reference to the iterator and may pick off as many elements as it likes, to produce the next iterator element.Iterator element type is *X*, if the return type of `F` is *Option<X>*.See *.batching()* for more information."],["Chunk","An iterator for the elements in a single chunk.Iterator element type is `I::Item`."],["Chunks","An iterator that yields the Chunk iterators.Iterator element type is `Chunk`.See `.chunks_lazy()` for more information."],["ChunksLazy","`ChunkLazy` is the storage for a lazy chunking operation.`ChunksLazy` behaves just like `GroupByLazy`: it is iterable, and it only buffers if several chunk iterators are alive at the same time.This type implements `IntoIterator` (it is **not** an iterator itself), because the chunk iterators need to borrow from this value. It should be stored in a local variable or temporary and iterated.Iterator element type is `Chunk`, each chunk's iterator.See `.chunks_lazy()` for more information."],["Coalesce","An iterator adaptor that may join together adjacent elements.See *.coalesce()* for more information."],["Combinations","An iterator to iterate through all the combinations of pairs in a `Clone`-able iterator.See *.combinations()* for more information."],["CombinationsN","An iterator to iterate through all the `n`-length combinations in an iterator.See *.combinations_n()* for more information."],["Dedup","An iterator adaptor that removes repeated duplicates.See *.dedup()* for more information."],["Flatten","An iterator adapter to simply flatten a structure.See *.flatten()* for more information."],["Format","Format all iterator elements lazily, separated by `sep`.See `.format()` for more information."],["Group","An iterator for the elements in a single group.Iterator element type is `I::Item`."],["GroupBy","An iterator adaptor that groups iterator elements. Consecutive elements that map to the same key (“runs”), are returned as the iterator elements.See *.group_by()* for more information."],["GroupByLazy","`GroupByLazy` is the storage for the lazy grouping operation.If the groups are consumed in their original order, or if each group is dropped without keeping it around, then `GroupByLazy` uses no allocations. It needs allocations only if several group iterators are alive at the same time.This type implements `IntoIterator` (it is **not** an iterator itself), because the group iterators need to borrow from this value. It should be stored in a local variable or temporary and iterated.See `.group_by_lazy()` for more information."],["Groups","An iterator that yields the Group iterators.Iterator element type is `(K, Group)`: the group's key `K` and the group's iterator.See `.group_by_lazy()` for more information."],["ISlice","An iterator adaptor that yields a subset (a slice) of the base iterator.**Note:** slicing an iterator is not constant time, and much less efficient than slicing for example a vector.See *.slice()* for more information."],["Interleave","An iterator adaptor that alternates elements from two iterators until both run out.This iterator is *fused*.See *.interleave()* for more information."],["InterleaveShortest","An iterator adaptor that alternates elements from the two iterators until one of them runs out.This iterator is *fused*.See *.interleave_shortest()* for more information."],["Intersperse","An iterator adaptor to insert a particular value between each element of the adapted iterator.Iterator element type is `I::Item`This iterator is *fused*.See *.intersperse()* for more information."],["KMerge","An iterator adaptor that merges an abitrary number of base iterators in ascending order. If all base iterators are sorted (ascending), the result is sorted.Iterator element type is `I::Item`.See *.kmerge()* for more information."],["Linspace","An iterator of a sequence of evenly spaced floats.Iterator element type is `F`."],["MendSlices","An iterator adaptor that glues together adjacent contiguous slices.See *.mend_slices()* for more information."],["Merge","An iterator adaptor that merges the two base iterators in ascending order. If both base iterators are sorted (ascending), the result is sorted.Iterator element type is `I::Item`.See *.merge()* for more information."],["MergeBy","An iterator adaptor that merges the two base iterators in ascending order. If both base iterators are sorted (ascending), the result is sorted.Iterator element type is `I::Item`.See *.merge_by()* for more information."],["MultiPeek","An iterator adaptor that allows the user to peek at multiple *.next()* values without advancing itself.See *.multipeek()* for more information."],["PadUsing","An iterator adaptor that pads a sequence to a minimum length by filling missing elements using a closure.Iterator element type is **I::Item**.See *.pad_using()* for more information."],["Product","An iterator adaptor that iterates over the cartesian product of the element sets of two iterators `I` and `J`.Iterator element type is `(I::Item, J::Item)`.See *.cartesian_product()* for more information."],["PutBack","An iterator adaptor that allows putting back a single item to the front of the iterator.Iterator element type is `I::Item`."],["PutBackN","An iterator adaptor that allows putting multiple items in front of the iterator.Iterator element type is `I::Item`."],["RcIter","A wrapper for `Rc<RefCell<I>>`, that implements the `Iterator` trait.See *.into_rc()* for more information."],["RepeatCall","An iterator source that produces elements indefinitely by calling a given closure.Iterator element type is the return type of the closure."],["RepeatN","An iterator that repeats an element exactly *n* times."],["Step","An iterator adaptor that steps a number elements in the base iterator for each iteration.The iterator steps by yielding the next element from the base iterator, then skipping forward *n-1* elements.See *.step()* for more information."],["Stride","An iterator similar to the slice iterator, but with a certain number of steps (the stride) skipped per iteration.`Stride` does not support zero-sized types for `A`.Iterator element type is `&'a A`."],["StrideMut","The mutable equivalent of Stride.`StrideMut` does not support zero-sized types for `A`.Iterator element type is `&'a mut A`."],["TakeWhileRef","An iterator adaptor that borrows from a `Clone`-able iterator to only pick off elements while the predicate returns `true`.See *.take_while_ref()* for more information."],["Tee","One half of an iterator pair where both return the same elements.See *.tee()* for more information."],["Unfold","`Unfold` is a general iterator builder: it has a mutable state value, and a closure with access to the state that produces the next value.This more or less equivalent to a regular struct with an `Iterator` implementation, and is useful for one-off iterators."],["Unique","An iterator adapter to filter out duplicate elements.See *.unique()* for more information."],["UniqueBy","An iterator adapter to filter out duplicate elements.See *.unique_by()* for more information."],["WhileSome","An iterator adaptor that filters `Option<A>` iterator elements and produces `A`. Stops on the first `None` encountered.See *.while_some()* for more information."],["Zip","An iterator that generalizes *.zip()* and allows running multiple iterators in lockstep.The iterator `Zip<(I, J, ..., M)>` is formed from a tuple of iterators (or values that implement `IntoIterator`) and yields elements until any of the subiterators yields `None`.The iterator element type is a tuple like like `(A, B, ..., E)` where `A` to `E` are the element types of the subiterator."],["ZipLongest","An iterator which iterates two other iterators simultaneouslyThis iterator is *fused*.See *.zip_longest()* for more information."],["ZipSlices","An iterator which iterates two slices simultaneously.`ZipSlices` acts like a double-ended `.zip()` iterator, but more efficiently.Note that elements past the end of the shortest of the two slices are ignored.Iterator element type for `ZipSlices<T, U>` is `(T::Item, U::Item)`. For example, for a `ZipSlices<&'a [A], &'b mut [B]>`, the element type is `(&'a A, &'b mut B)`."]],"trait":[["Itertools","The trait `Itertools`: extra iterator adaptors and methods for iterators.This trait defines a number of methods. They are divided into two groups:*Adaptors* take an iterator and parameter as input, and return a new iterator value. These are listed first in the trait. An example of an adaptor is `.interleave()`*Regular methods* are those that don't return iterators and instead return a regular value of some other kind. `.find_position()` is an example and the first regular method in the list."]],"type":[["MapFn","The function pointer map iterator created with `.map_fn()`."]]});