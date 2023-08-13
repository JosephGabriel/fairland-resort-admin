import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthPayloadKeySpecifier = ('token' | 'user' | AuthPayloadKeySpecifier)[];
export type AuthPayloadFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BookingKeySpecifier = ('bookingDate' | 'dateIn' | 'dateOut' | 'id' | 'paid' | 'price' | 'room' | 'user' | BookingKeySpecifier)[];
export type BookingFieldPolicy = {
	bookingDate?: FieldPolicy<any> | FieldReadFunction<any>,
	dateIn?: FieldPolicy<any> | FieldReadFunction<any>,
	dateOut?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	paid?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HotelKeySpecifier = ('address' | 'addressNumber' | 'city' | 'createdAt' | 'description' | 'id' | 'images' | 'latitude' | 'logo' | 'longitude' | 'name' | 'neighborhood' | 'rating' | 'rooms' | 'slug' | 'state' | 'summary' | 'thumbnail' | 'updatedAt' | 'zipCode' | HotelKeySpecifier)[];
export type HotelFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	addressNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	latitude?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	longitude?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	neighborhood?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	zipCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HotelsPayloadKeySpecifier = ('count' | 'hotels' | HotelsPayloadKeySpecifier)[];
export type HotelsPayloadFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	hotels?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createAdmin' | 'createBooking' | 'createHotel' | 'createRoom' | 'createUser' | 'deactivateUser' | 'deleteBooking' | 'deleteHotel' | 'deleteRoom' | 'loginUser' | 'updateHotel' | 'updateRoom' | 'updateUser' | 'updateUserPassword' | 'verifyUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	createBooking?: FieldPolicy<any> | FieldReadFunction<any>,
	createHotel?: FieldPolicy<any> | FieldReadFunction<any>,
	createRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deactivateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteBooking?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteHotel?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	loginUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateHotel?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('booking' | 'bookings' | 'hotel' | 'hotelBySlug' | 'hotels' | 'hotelsByAdmin' | 'room' | 'rooms' | 'roomsByHotel' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	booking?: FieldPolicy<any> | FieldReadFunction<any>,
	bookings?: FieldPolicy<any> | FieldReadFunction<any>,
	hotel?: FieldPolicy<any> | FieldReadFunction<any>,
	hotelBySlug?: FieldPolicy<any> | FieldReadFunction<any>,
	hotels?: FieldPolicy<any> | FieldReadFunction<any>,
	hotelsByAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>,
	roomsByHotel?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReviewKeySpecifier = ('id' | 'rating' | 'review' | 'room' | 'user' | ReviewKeySpecifier)[];
export type ReviewFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	review?: FieldPolicy<any> | FieldReadFunction<any>,
	room?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomKeySpecifier = ('createdAt' | 'description' | 'hotel' | 'id' | 'images' | 'name' | 'price' | 'rating' | 'summary' | 'thumbnail' | 'updatedAt' | RoomKeySpecifier)[];
export type RoomFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	hotel?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('active' | 'avatar' | 'bookings' | 'email' | 'firstName' | 'id' | 'lastName' | 'password' | 'passwordChangedAt' | 'reviews' | 'role' | 'userName' | 'verified' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	active?: FieldPolicy<any> | FieldReadFunction<any>,
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	bookings?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordChangedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	reviews?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	userName?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AuthPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthPayloadKeySpecifier | (() => undefined | AuthPayloadKeySpecifier),
		fields?: AuthPayloadFieldPolicy,
	},
	Booking?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BookingKeySpecifier | (() => undefined | BookingKeySpecifier),
		fields?: BookingFieldPolicy,
	},
	Hotel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HotelKeySpecifier | (() => undefined | HotelKeySpecifier),
		fields?: HotelFieldPolicy,
	},
	HotelsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HotelsPayloadKeySpecifier | (() => undefined | HotelsPayloadKeySpecifier),
		fields?: HotelsPayloadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Review?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReviewKeySpecifier | (() => undefined | ReviewKeySpecifier),
		fields?: ReviewFieldPolicy,
	},
	Room?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomKeySpecifier | (() => undefined | RoomKeySpecifier),
		fields?: RoomFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;