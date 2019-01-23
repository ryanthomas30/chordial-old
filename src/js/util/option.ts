import { NonEmpty } from './types'
import { Either, Left, Right } from './either'

abstract class _Option<A> {
	abstract isEmpty(): boolean
	abstract get(): A
	isDefined(): boolean { return !this.isEmpty() }
	nonEmpty(): boolean { return this.isDefined() }

	getOrElse(e: A): A {
		if (this.isEmpty()) return e
		else return this.get()
	}

	orElse(alt: Option<A>): Option<A> {
		if (this.isEmpty()) return alt
		else return this
	}

	map<B extends NonEmpty>(f: (a: A) => B): Option<B> {
		if (this.isEmpty()) return None
		else return Some(f(this.get()))
	}

	flatMap<B extends NonEmpty>(f: (a: A) => Option<B>): Option<B> {
		if (this.isEmpty()) return None
		else return f(this.get())
	}

	fold<B extends NonEmpty>(b: B, f: (a: A) => B): B {
		if (this.isEmpty()) return b
		else return f(this.get())
	}

	filter(p: (a: A) => boolean): Option<A> {
		if (this.isEmpty() || p(this.get())) return this
		else return None
	}

	filterNot(p: (a: A) => boolean): Option<A> {
		if (this.isEmpty() || !p(this.get())) return this
		else return None
	}

	contains(elem: A): boolean {
		return !this.isEmpty() && (this.get() == elem || this.get() === elem)
	}

	exists(p: (a: A) => boolean): boolean {
		return !this.isEmpty() && p(this.get())
	}

	forall(p: (a: A) => boolean): boolean {
		return this.isEmpty() || p(this.get())
	}

	foreach<B>(f: (a: A) => B): void {
		if (!this.isEmpty()) f(this.get())
	}

	toArray(): Array<A> {
		if (this.isEmpty()) return Array()
		else return Array(this.get())
	}

	toEither<B>(left: B): Either<B, A> {
		if (this.isEmpty()) return Left(left)
		else return Right(this.get())
	}

	match<B extends NonEmpty, C extends NonEmpty>(
		fb: (a: A) => B,
		fc: () => C
	): B | C {
		if (this.isEmpty()) return fc()
		else return fb(this.get())
	}
}
export type Option<T> = _Option<T>
export function Option<T>(value: T): Option<T> {
	if (value == null || value == undefined) return None
	else return Some(value as T & NonEmpty)
}

class _Some<A> extends _Option<A> {
	constructor(readonly value: A) { super() }

	isEmpty(): boolean { return false }
	get(): A { return this.value }
}
export type Some<T> = _Some<T>
export function Some<T extends NonEmpty>(value: T): Some<T> {
	return new _Some(value)
}

class _None extends _Option<never> {
	isEmpty(): boolean { return true }
	get(): never { throw new ReferenceError('None.get() is illegal') }
}
export type None = _None
export const None = new _None() as None

// export interface Some<T> {
// 	value: T
// }
// export interface SomeConstructor<T> {
// 	new(value: T): Some<T>
// 	(value: T): Some<T>
// }
// const Some: SomeConstructor


// function Some<T extends NonEmpty>(value: T): Some<T> {
// 	return value 
// }

// export interface Some<T> extends Option<T> {
//   type: 'some'
//   get(): T
// }

// export interface None extends Option<never> {
//   type: 'none'
//   get(): never
// }
