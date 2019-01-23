import { NonEmpty } from './types'
import { Option, Some, None } from './option'

export abstract class _Either<A, B> {
	abstract isLeft(): boolean
	abstract isRight(): boolean
	abstract value: A | B

	get(): A | B {
		return this.value
	}

	asRight(): B {
		if (this.isRight()) return this.value as B
		else throw new ReferenceError('asRight(): Cannot use a Left as a Right')
	}

	asLeft(): A {
		if (this.isLeft()) return this.value as A
		else throw new ReferenceError('asLeft(): Cannot use a Right as a Left')
	}

	fold<C>(
		fa: (a: A) => C,
		fb: (b: B) => C
	): C {
		if (this.isRight()) return fb(this.asRight())
		else return fa(this.asLeft())
	}

	foreach<U>(f: (b: B) => U): void {
		if (this.isRight()) f(this.asRight())
	}

	getOrElse(or: B): B {
		if (this.isRight()) return this.asRight()
		else return or
	}

	orElse(or: Either<A, B>): Either<A, B> {
		if (this.isRight()) return this
		else return or
	}

	contains(elem: B): boolean {
		if (this.isRight()) return (this.asRight() == elem || this.asRight() === elem)
		else return false
	}

	forall(f: (b: B) => boolean): boolean {
		if (this.isRight()) return f(this.asRight())
		else return true
	}

	exists(p: (b: B) => boolean): boolean {
		if (this.isRight()) return p(this.asRight())
		else return false
	}

	map<C>(f: (b: B) => C): Either<A, C> {
		if (this.isRight()) return Right(f(this.asRight()))
		else return Left(this.asLeft())
	}

	flatMap<C>(f: (b: B) => Either<A, C>): Either<A, C> {
		if (this.isRight()) return f(this.asRight())
		else return Left(this.asLeft())
	}

	filterOrElse(p: (b: B) => boolean, zero: A): Either<A, B> {
		if (this.isRight() && !p(this.asRight())) return Left(zero)
		else return this
	}

	toArray(): Array<B> {
		if (this.isRight()) return Array(this.asRight())
		else return Array()
	}

	toOption(): Option<B> {
		if (this.isRight() && this.asRight() !== null)
			return Some(this.asRight() as B & NonEmpty)
		else return None
	}

	match<C, D>(
		fa: (a: A) => C,
		fb: (b: B) => D
	): Either<C, D> {
		if (this.isRight()) return Right<C, D>(fb(this.asRight()))
		else return Left<C, D>(fa(this.asLeft()))
	}

}
export type Either<A, B> = _Either<A, B>

class _Left<A, B> extends _Either<A, B> {
	constructor(readonly value: A) { super() }

	isLeft(): boolean { return true }
	isRight(): boolean { return false }
}
export type Left<A, B> = _Left<A, B>
export function Left<A, B>(value: A): Left<A, B> {
	return new _Left(value) as Left<A, B>
}

class _Right<A, B> extends _Either<A, B> {
	constructor(readonly value: B) { super() }

	isLeft(): boolean { return false }
	isRight(): boolean { return true }
}
export type Right<A, B> = _Right<A, B>
export function Right<A, B>(value: B): Right<A, B> {
	return new _Right(value) as Right<A, B>
}
