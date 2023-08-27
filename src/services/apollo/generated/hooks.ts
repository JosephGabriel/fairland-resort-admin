import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type AuthPayload = {
  token: Scalars['String']['output'];
  user: User;
};

export type Booking = {
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

export type CreateBookingInput = {
  dateIn: Scalars['String']['input'];
  dateOut: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  room: Scalars['ID']['input'];
};

export type CreateHotelInput = {
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

export type CreateRoomInput = {
  description: Scalars['String']['input'];
  hotel: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  summary: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
  userName: Scalars['String']['input'];
};

export type Hotel = {
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

export type HotelsPayload = QueryPayload & {
  /** Quantidade total de hotéis criados */
  count: Scalars['Int']['output'];
  /** Array com hotéis */
  nodes: Array<Hotel>;
};

export type LoginUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['Password']['input'];
};

export type Mutation = {
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


export type MutationCreateAdminArgs = {
  data: CreateUserInput;
};


export type MutationCreateBookingArgs = {
  data: CreateBookingInput;
};


export type MutationCreateHotelArgs = {
  data: CreateHotelInput;
};


export type MutationCreateRoomArgs = {
  data: CreateRoomInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteHotelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  data: LoginUserInput;
};


export type MutationUpdateHotelArgs = {
  data: UpdateHotelInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateRoomArgs = {
  data: UpdateRoomInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};

export type Options = {
  orderBy?: InputMaybe<OrderBy>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
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


export type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHotelArgs = {
  id: Scalars['ID']['input'];
  roomOptions?: InputMaybe<Options>;
};


export type QueryHotelBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryHotelsArgs = {
  roomOptions?: InputMaybe<Options>;
};


export type QueryHotelsByAdminArgs = {
  options?: InputMaybe<Options>;
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomsArgs = {
  filter?: InputMaybe<RoomFilter>;
};


export type QueryRoomsByHotelArgs = {
  hotel: Scalars['ID']['input'];
  options?: InputMaybe<Options>;
};

export type QueryPayload = {
  count: Scalars['Int']['output'];
};

export type Review = {
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

export type Room = {
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

export type RoomFilter = {
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
};

export type RoomPayload = QueryPayload & {
  /** Quantidade total de quartos criados */
  count: Scalars['Int']['output'];
  /** Array com quartos */
  nodes: Array<Room>;
};

export type UpdateHotelInput = {
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

export type UpdateRoomInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  password: Scalars['Password']['input'];
  passwordConfirm: Scalars['Password']['input'];
};

export type User = {
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

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CreateHotelMutationVariables = Exact<{
  data: CreateHotelInput;
}>;


export type CreateHotelMutation = { createHotel: { id: string, name: string, summary: string, thumbnail: string, city: string, state: string } };

export type DeleteHotelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteHotelMutation = { deleteHotel: { id: string } };

export type GetHotelByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetHotelByIdQuery = { hotel: { id: string, name: string, rating: number, summary: string, description: string, images: Array<string>, thumbnail: string, logo: string, slug: string, longitude: number, latitude: number, address: string, addressNumber: string, zipCode: string, neighborhood: string, state: string, city: string } };

export type GetHotelBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetHotelBySlugQuery = { hotelBySlug: { id: string, name: string, rating: number, summary: string, description: string, thumbnail: string, images: Array<string>, logo: string, slug: string, latitude: number, longitude: number, address: string, addressNumber: string, zipCode: string } };

export type GetHotelsByAdminQueryVariables = Exact<{
  options?: InputMaybe<Options>;
}>;


export type GetHotelsByAdminQuery = { hotelsByAdmin: { count: number, nodes: Array<{ id: string, name: string, summary: string, thumbnail: string, city: string, state: string }> } };

export type GetAllHotelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllHotelsQuery = { hotels: Array<{ id: string, name: string, rating: number, summary: string, description: string, thumbnail: string, images: Array<string>, logo: string, latitude: number, slug: string, address: string, addressNumber: string, zipCode: string }> };

export type CreateRoomMutationVariables = Exact<{
  data: CreateRoomInput;
}>;


export type CreateRoomMutation = { createRoom: { id: string, name: string, summary: string, description: string, thumbnail: string, images?: Array<string> | null, price: number, rating?: number | null, createdAt: Date } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRoomMutation = { deleteRoom: string };

export type GetRoomsByHotelQueryVariables = Exact<{
  hotelId: Scalars['ID']['input'];
  options?: InputMaybe<Options>;
}>;


export type GetRoomsByHotelQuery = { roomsByHotel: { count: number, nodes: Array<{ id: string, name: string, summary: string, thumbnail: string, createdAt: Date }> } };

export type LoginUserMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginUserMutation = { loginUser: { token: string, user: { id: string, role: UserRole, avatar?: string | null, active: boolean, firstName: string, lastName: string, verified: boolean } } };


export const CreateHotelDocument = gql`
    mutation CreateHotel($data: CreateHotelInput!) {
  createHotel(data: $data) {
    id
    name
    summary
    thumbnail
    city
    state
  }
}
    `;
export type CreateHotelMutationFn = Apollo.MutationFunction<CreateHotelMutation, CreateHotelMutationVariables>;

/**
 * __useCreateHotelMutation__
 *
 * To run a mutation, you first call `useCreateHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHotelMutation, { data, loading, error }] = useCreateHotelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateHotelMutation(baseOptions?: Apollo.MutationHookOptions<CreateHotelMutation, CreateHotelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHotelMutation, CreateHotelMutationVariables>(CreateHotelDocument, options);
      }
export type CreateHotelMutationHookResult = ReturnType<typeof useCreateHotelMutation>;
export type CreateHotelMutationResult = Apollo.MutationResult<CreateHotelMutation>;
export type CreateHotelMutationOptions = Apollo.BaseMutationOptions<CreateHotelMutation, CreateHotelMutationVariables>;
export const DeleteHotelDocument = gql`
    mutation DeleteHotel($id: ID!) {
  deleteHotel(id: $id) {
    id
  }
}
    `;
export type DeleteHotelMutationFn = Apollo.MutationFunction<DeleteHotelMutation, DeleteHotelMutationVariables>;

/**
 * __useDeleteHotelMutation__
 *
 * To run a mutation, you first call `useDeleteHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHotelMutation, { data, loading, error }] = useDeleteHotelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHotelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHotelMutation, DeleteHotelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHotelMutation, DeleteHotelMutationVariables>(DeleteHotelDocument, options);
      }
export type DeleteHotelMutationHookResult = ReturnType<typeof useDeleteHotelMutation>;
export type DeleteHotelMutationResult = Apollo.MutationResult<DeleteHotelMutation>;
export type DeleteHotelMutationOptions = Apollo.BaseMutationOptions<DeleteHotelMutation, DeleteHotelMutationVariables>;
export const GetHotelByIdDocument = gql`
    query GetHotelById($id: ID!) {
  hotel(id: $id) {
    id
    name
    rating
    summary
    description
    images
    thumbnail
    logo
    slug
    longitude
    latitude
    address
    addressNumber
    zipCode
    neighborhood
    state
    city
  }
}
    `;

/**
 * __useGetHotelByIdQuery__
 *
 * To run a query within a React component, call `useGetHotelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHotelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHotelByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetHotelByIdQuery(baseOptions: Apollo.QueryHookOptions<GetHotelByIdQuery, GetHotelByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHotelByIdQuery, GetHotelByIdQueryVariables>(GetHotelByIdDocument, options);
      }
export function useGetHotelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHotelByIdQuery, GetHotelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHotelByIdQuery, GetHotelByIdQueryVariables>(GetHotelByIdDocument, options);
        }
export type GetHotelByIdQueryHookResult = ReturnType<typeof useGetHotelByIdQuery>;
export type GetHotelByIdLazyQueryHookResult = ReturnType<typeof useGetHotelByIdLazyQuery>;
export type GetHotelByIdQueryResult = Apollo.QueryResult<GetHotelByIdQuery, GetHotelByIdQueryVariables>;
export const GetHotelBySlugDocument = gql`
    query GetHotelBySlug($slug: String!) {
  hotelBySlug(slug: $slug) {
    id
    name
    rating
    summary
    description
    thumbnail
    images
    logo
    slug
    latitude
    longitude
    address
    addressNumber
    zipCode
  }
}
    `;

/**
 * __useGetHotelBySlugQuery__
 *
 * To run a query within a React component, call `useGetHotelBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHotelBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHotelBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetHotelBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>(GetHotelBySlugDocument, options);
      }
export function useGetHotelBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>(GetHotelBySlugDocument, options);
        }
export type GetHotelBySlugQueryHookResult = ReturnType<typeof useGetHotelBySlugQuery>;
export type GetHotelBySlugLazyQueryHookResult = ReturnType<typeof useGetHotelBySlugLazyQuery>;
export type GetHotelBySlugQueryResult = Apollo.QueryResult<GetHotelBySlugQuery, GetHotelBySlugQueryVariables>;
export const GetHotelsByAdminDocument = gql`
    query GetHotelsByAdmin($options: Options) {
  hotelsByAdmin(options: $options) {
    count
    nodes {
      id
      name
      summary
      thumbnail
      city
      state
    }
  }
}
    `;

/**
 * __useGetHotelsByAdminQuery__
 *
 * To run a query within a React component, call `useGetHotelsByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHotelsByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHotelsByAdminQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetHotelsByAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>(GetHotelsByAdminDocument, options);
      }
export function useGetHotelsByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>(GetHotelsByAdminDocument, options);
        }
export type GetHotelsByAdminQueryHookResult = ReturnType<typeof useGetHotelsByAdminQuery>;
export type GetHotelsByAdminLazyQueryHookResult = ReturnType<typeof useGetHotelsByAdminLazyQuery>;
export type GetHotelsByAdminQueryResult = Apollo.QueryResult<GetHotelsByAdminQuery, GetHotelsByAdminQueryVariables>;
export const GetAllHotelsDocument = gql`
    query GetAllHotels {
  hotels {
    id
    name
    rating
    summary
    description
    thumbnail
    images
    logo
    latitude
    slug
    address
    addressNumber
    zipCode
  }
}
    `;

/**
 * __useGetAllHotelsQuery__
 *
 * To run a query within a React component, call `useGetAllHotelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllHotelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllHotelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllHotelsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllHotelsQuery, GetAllHotelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllHotelsQuery, GetAllHotelsQueryVariables>(GetAllHotelsDocument, options);
      }
export function useGetAllHotelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllHotelsQuery, GetAllHotelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllHotelsQuery, GetAllHotelsQueryVariables>(GetAllHotelsDocument, options);
        }
export type GetAllHotelsQueryHookResult = ReturnType<typeof useGetAllHotelsQuery>;
export type GetAllHotelsLazyQueryHookResult = ReturnType<typeof useGetAllHotelsLazyQuery>;
export type GetAllHotelsQueryResult = Apollo.QueryResult<GetAllHotelsQuery, GetAllHotelsQueryVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($data: CreateRoomInput!) {
  createRoom(data: $data) {
    id
    name
    summary
    description
    thumbnail
    images
    price
    rating
    createdAt
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($id: ID!) {
  deleteRoom(id: $id)
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetRoomsByHotelDocument = gql`
    query GetRoomsByHotel($hotelId: ID!, $options: Options) {
  roomsByHotel(hotel: $hotelId, options: $options) {
    count
    nodes {
      id
      name
      summary
      thumbnail
      createdAt
    }
  }
}
    `;

/**
 * __useGetRoomsByHotelQuery__
 *
 * To run a query within a React component, call `useGetRoomsByHotelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsByHotelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsByHotelQuery({
 *   variables: {
 *      hotelId: // value for 'hotelId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetRoomsByHotelQuery(baseOptions: Apollo.QueryHookOptions<GetRoomsByHotelQuery, GetRoomsByHotelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsByHotelQuery, GetRoomsByHotelQueryVariables>(GetRoomsByHotelDocument, options);
      }
export function useGetRoomsByHotelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsByHotelQuery, GetRoomsByHotelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsByHotelQuery, GetRoomsByHotelQueryVariables>(GetRoomsByHotelDocument, options);
        }
export type GetRoomsByHotelQueryHookResult = ReturnType<typeof useGetRoomsByHotelQuery>;
export type GetRoomsByHotelLazyQueryHookResult = ReturnType<typeof useGetRoomsByHotelLazyQuery>;
export type GetRoomsByHotelQueryResult = Apollo.QueryResult<GetRoomsByHotelQuery, GetRoomsByHotelQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginUserInput!) {
  loginUser(data: $data) {
    token
    user {
      id
      role
      avatar
      active
      firstName
      lastName
      verified
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;