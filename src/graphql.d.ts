type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  Latitude: { input: number; output: number; }
  Longitude: { input: number; output: number; }
  Password: { input: string; output: string; }
  PostalCode: { input: string; output: string; }
};

type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

type Booking = {
  __typename?: 'Booking';
  /** Data em qua a reserva foi feita */
  bookingDate: Scalars['String']['output'];
  /** Data de entrada da reserva */
  dateIn: Scalars['String']['output'];
  /** Data de saida da reserva */
  dateOut: Scalars['String']['output'];
  /** Id da reserva */
  id: Scalars['ID']['output'];
  /** Booleano que mostra se foi pago ou não */
  paid: Scalars['Boolean']['output'];
  /** Preço da reserva */
  price: Scalars['Float']['output'];
  /** Quarto reservado */
  room: Room;
  /** Usuário que fez a reserva */
  user: User;
};

type CreateBookingInput = {
  dateIn: Scalars['String']['input'];
  dateOut: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  room: Scalars['ID']['input'];
};

type CreateHotelInput = {
  address: Scalars['String']['input'];
  addressNumber: Scalars['String']['input'];
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude: Scalars['Latitude']['input'];
  logo: Scalars['String']['input'];
  longitude: Scalars['Longitude']['input'];
  name: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
  state: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
  zipCode: Scalars['PostalCode']['input'];
};

type CreateRoomInput = {
  description: Scalars['String']['input'];
  hotel: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  summary: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
};

type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
  userName: Scalars['String']['input'];
};

type Hotel = {
  __typename?: 'Hotel';
  /** Rua do hotel */
  address: Scalars['String']['output'];
  /** Número residencial do hotel */
  addressNumber: Scalars['String']['output'];
  /** Cidade do hotel */
  city: Scalars['String']['output'];
  /** Data de criação do hotel */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** A descrição do hotel */
  description: Scalars['String']['output'];
  /** Id do hotel */
  id: Scalars['ID']['output'];
  /** Um array de url's de imagens de hoteis */
  images: Array<Scalars['String']['output']>;
  /** Latitude do hotel */
  latitude: Scalars['Latitude']['output'];
  /** Url da logo do hotel */
  logo: Scalars['String']['output'];
  /** Longitude do hotel */
  longitude: Scalars['Longitude']['output'];
  /** Nome do hotel */
  name: Scalars['String']['output'];
  /** Bairro do hotel */
  neighborhood: Scalars['String']['output'];
  /** Classificação do hotel ex: 5 estrelas */
  rating: Scalars['Int']['output'];
  /** Array com os quartos do hotel */
  rooms: Array<Room>;
  /** Slug do hotel baseado no nome */
  slug: Scalars['String']['output'];
  /** Estado do hotel */
  state: Scalars['String']['output'];
  /** Uma pequena descrição do hotel de 10 as 30 palavras */
  summary: Scalars['String']['output'];
  /** Thumbnail a ser exibida do hotel */
  thumbnail: Scalars['String']['output'];
  /** Data da ultima atualização do hotel */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Cep do hotel */
  zipCode: Scalars['PostalCode']['output'];
};

type HotelsPayload = QueryPayload & {
  __typename?: 'HotelsPayload';
  /** Quantidade total de hotéis criados */
  count: Scalars['Int']['output'];
  /** Array com hotéis */
  nodes: Array<Hotel>;
};

type LoginUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['Password']['input'];
};

type Mutation = {
  __typename?: 'Mutation';
  /** Usada para criar um admin */
  createAdmin: AuthPayload;
  /** Usada para fazer uma reserva */
  createBooking: Booking;
  /** Usada para criar um hotel */
  createHotel: Hotel;
  /** Usada para criar um quarto de hotel */
  createRoom: Room;
  /** Usada para criar um usuário */
  createUser: AuthPayload;
  /** Usada para que o próprio usuário possa desativar a conta, mas não apagá-la */
  deactivateUser: Scalars['String']['output'];
  /** Usada para cancelar uma reserva */
  deleteBooking: Scalars['String']['output'];
  /** Usada para apagar um hotel */
  deleteHotel: Hotel;
  /** Usada para deletar um quarto de hotel */
  deleteRoom: Scalars['String']['output'];
  /** Usada para fazer login */
  loginUser: AuthPayload;
  /** Usada para atualizar um hotel */
  updateHotel: Hotel;
  /** Usada para atualizar um quarto de hotel */
  updateRoom: Room;
  /** Usada para atualizar informações não sensiveis (ex: senhas) */
  updateUser: AuthPayload;
  /** Usada para alterar a senha do usuário */
  updateUserPassword: AuthPayload;
  /** Usada para verificar um usuário */
  verifyUser: AuthPayload;
};


type MutationCreateAdminArgs = {
  data: CreateUserInput;
};


type MutationCreateBookingArgs = {
  data: CreateBookingInput;
};


type MutationCreateHotelArgs = {
  data: CreateHotelInput;
};


type MutationCreateRoomArgs = {
  data: CreateRoomInput;
};


type MutationCreateUserArgs = {
  data: CreateUserInput;
};


type MutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};


type MutationDeleteHotelArgs = {
  id: Scalars['ID']['input'];
};


type MutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


type MutationLoginUserArgs = {
  data: LoginUserInput;
};


type MutationUpdateHotelArgs = {
  data: UpdateHotelInput;
  id: Scalars['ID']['input'];
};


type MutationUpdateRoomArgs = {
  data: UpdateRoomInput;
  id: Scalars['ID']['input'];
};


type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};

type Options = {
  orderBy?: InputMaybe<OrderBy>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

type Query = {
  __typename?: 'Query';
  /** Usada para buscar uma reserva pelo id */
  booking: Booking;
  /** Usada para buscar reservas de um usuário */
  bookings: Array<Booking>;
  /** Usada para buscar um hotel pelo id */
  hotel: Hotel;
  /** Usada para buscar um hotel pelo slug */
  hotelBySlug: Hotel;
  /** Usada para buscar hotéis */
  hotels: Array<Hotel>;
  /** Usada para buscar um hotel pelo id do admin */
  hotelsByAdmin: HotelsPayload;
  /** Usada para buscar um quarto pelo id */
  room: Room;
  /** Usada para buscar um quartos */
  rooms: Array<Room>;
  /** Usada para buscar quartos pelo id do hotel */
  roomsByHotel: RoomPayload;
};


type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


type QueryHotelArgs = {
  id: Scalars['ID']['input'];
  roomOptions?: InputMaybe<Options>;
};


type QueryHotelBySlugArgs = {
  slug: Scalars['String']['input'];
};


type QueryHotelsArgs = {
  roomOptions?: InputMaybe<Options>;
};


type QueryHotelsByAdminArgs = {
  options?: InputMaybe<Options>;
};


type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


type QueryRoomsArgs = {
  filter?: InputMaybe<RoomFilter>;
};


type QueryRoomsByHotelArgs = {
  hotel: Scalars['ID']['input'];
  options?: InputMaybe<Options>;
};

type QueryPayload = {
  count: Scalars['Int']['output'];
};

type Review = {
  __typename?: 'Review';
  /** Id da review */
  id: Scalars['ID']['output'];
  /** Classificação da review */
  rating: Scalars['Int']['output'];
  /** Texto da review */
  review: Scalars['String']['output'];
  /** Quarto que recebeu a review */
  room: Room;
  /** Usuário que fez a review */
  user: User;
};

type Room = {
  __typename?: 'Room';
  /** Data em que foi criado */
  createdAt: Scalars['DateTime']['output'];
  /** Uma descrição do quarto */
  description: Scalars['String']['output'];
  /** Hotel a qual o quarto pertence */
  hotel: Hotel;
  /** Id do quarto */
  id: Scalars['ID']['output'];
  /** Um array de url's de imagens do quarto */
  images?: Maybe<Array<Scalars['String']['output']>>;
  /** Nome do quarto */
  name: Scalars['String']['output'];
  /** Preço por noite do quarto */
  price: Scalars['Float']['output'];
  /** Classificação do quarto ex: 5 estrelas */
  rating?: Maybe<Scalars['Int']['output']>;
  /** Uma pequena descrição do quarto */
  summary: Scalars['String']['output'];
  /** Thumbnail a ser exibida do quarto */
  thumbnail: Scalars['String']['output'];
  /** Data da ultima atualização */
  updatedAt: Scalars['DateTime']['output'];
};

type RoomFilter = {
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
};

type RoomPayload = QueryPayload & {
  __typename?: 'RoomPayload';
  /** Quantidade total de quartos criados */
  count: Scalars['Int']['output'];
  /** Array com quartos */
  nodes: Array<Room>;
};

type UpdateHotelInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  latitude?: InputMaybe<Scalars['Latitude']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Longitude']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['PostalCode']['input']>;
};

type UpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

type UpdateUserPasswordInput = {
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
};

type User = {
  __typename?: 'User';
  /** Mostra se o usuário esta ativo ou não */
  active: Scalars['Boolean']['output'];
  /** Url da imagem de perfil de cada usuário */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Reservas do usúario */
  bookings?: Maybe<Array<Booking>>;
  /** Email único de cada usuário */
  email: Scalars['EmailAddress']['output'];
  /** Primeiro nome do usuário */
  firstName: Scalars['String']['output'];
  /** Id único de cada usuário */
  id: Scalars['ID']['output'];
  /** Sobrenome nome do usuário */
  lastName: Scalars['String']['output'];
  /** Senha criptografada de cada usuário */
  password: Scalars['Password']['output'];
  /** Timestamp do momento em que o usuário mudou a senha */
  passwordChangedAt?: Maybe<Scalars['String']['output']>;
  /** Review feitas pelo usuário */
  reviews?: Maybe<Array<Review>>;
  /** Enum do tipo de função (ADMIN | USER) */
  role: UserRole;
  /** Nome de usuário único de cada usuário */
  userName: Scalars['String']['output'];
  /** Mostra se o usuário verificou o email ou não */
  verified: Scalars['Boolean']['output'];
};

enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

type GetAllBookingsQueryVariables = Exact<{ [key: string]: never; }>;


type GetAllBookingsQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string, price: number, paid: boolean, bookingDate: string, dateIn: string, dateOut: string, room: { __typename?: 'Room', name: string }, user: { __typename?: 'User', firstName: string, lastName: string } }> };

type CreateHotelMutationVariables = Exact<{
  data: CreateHotelInput;
}>;


type CreateHotelMutation = { __typename?: 'Mutation', createHotel: { __typename?: 'Hotel', id: string, name: string, summary: string, thumbnail: string, city: string, state: string } };

type DeleteHotelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


type DeleteHotelMutation = { __typename?: 'Mutation', deleteHotel: { __typename?: 'Hotel', id: string } };

type UpdateHotelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateHotelInput;
}>;


type UpdateHotelMutation = { __typename?: 'Mutation', updateHotel: { __typename?: 'Hotel', id: string, name: string, summary: string, thumbnail: string, city: string, state: string } };

type GetHotelByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


type GetHotelByIdQuery = { __typename?: 'Query', hotel: { __typename?: 'Hotel', name: string, summary: string, description: string, images: Array<string>, thumbnail: string, logo: string, longitude: number, latitude: number, address: string, addressNumber: string, zipCode: string, neighborhood: string, state: string, city: string } };

type GetHotelBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


type GetHotelBySlugQuery = { __typename?: 'Query', hotelBySlug: { __typename?: 'Hotel', id: string, name: string, rating: number, summary: string, description: string, thumbnail: string, images: Array<string>, logo: string, slug: string, latitude: number, longitude: number, address: string, addressNumber: string, zipCode: string } };

type GetHotelsByAdminQueryVariables = Exact<{
  options?: InputMaybe<Options>;
}>;


type GetHotelsByAdminQuery = { __typename?: 'Query', hotelsByAdmin: { __typename?: 'HotelsPayload', count: number, nodes: Array<{ __typename?: 'Hotel', id: string, name: string, summary: string, thumbnail: string, city: string, state: string, createdAt?: Date | null }> } };

type GetAllHotelsQueryVariables = Exact<{ [key: string]: never; }>;


type GetAllHotelsQuery = { __typename?: 'Query', hotels: Array<{ __typename?: 'Hotel', id: string, name: string, rating: number, summary: string, description: string, thumbnail: string, images: Array<string>, logo: string, latitude: number, slug: string, address: string, addressNumber: string, zipCode: string }> };

type CreateRoomMutationVariables = Exact<{
  data: CreateRoomInput;
}>;


type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: string, name: string, summary: string, description: string, thumbnail: string, images?: Array<string> | null, price: number, rating?: number | null, createdAt: Date } };

type DeleteRoomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: string };

type GetRoomsByHotelQueryVariables = Exact<{
  hotelId: Scalars['ID']['input'];
  options?: InputMaybe<Options>;
}>;


type GetRoomsByHotelQuery = { __typename?: 'Query', roomsByHotel: { __typename?: 'RoomPayload', count: number, nodes: Array<{ __typename?: 'Room', id: string, name: string, summary: string, thumbnail: string, createdAt: Date }> } };

type LoginUserMutationVariables = Exact<{
  data: LoginUserInput;
}>;


type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, role: UserRole, avatar?: string | null, active: boolean, firstName: string, lastName: string, verified: boolean } } };
