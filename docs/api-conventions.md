# API conventions

## Dates and times

- Use `YYYY-MM-DD` for calendar dates that do not represent a specific time or timezone.
  - Example: a pet's birthdate: `2020-03-15`.
- Use ISO 8601 timestamps in UTC for specific moments in time.
  - Example: `2026-10-28T15:41:27Z`.
- When a timestamp is received with a timezone offset, convert it to UTC before storing or returning it.
  - Example: `2026-10-28T16:41:27+01:00` becomes `2026-10-28T15:41:27Z`.
- Do not use locale-specific formats such as `03/15/2020` or `15-03-2020`.

## Responses

- Return successful response data directly as JSON, without a generic `data` wrapper.
- Return a single resource as a JSON object.
- Return an unpaginated collection as a JSON array.
- Return a paginated collection as an object containing `items` and pagination metadata.
- Use `Content-Type: application/json` for JSON responses.

## Errors

- Return errors using the `application/problem+json` format (RFC 9457).
- Include `type`, `title`, `status`, and a safe, human-readable `detail` when applicable.
- Include `instance` to identify the request that caused the error.
- Validation errors may include an `errors` extension with field-specific messages.
- Never expose stack traces, database details, credentials, or other internal information.

## HTTP status codes

- Use `200 OK` for successful requests that return a response body.
- Use `201 Created` when a request creates a resource.
- Use `204 No Content` when a request succeeds and returns no body.
- Use `400 Bad Request` for invalid input or malformed requests.
- Use `401 Unauthorized` when authentication is required but missing or invalid.
- Use `403 Forbidden` when the caller is authenticated but not allowed to perform the operation.
- Use `404 Not Found` when the requested resource does not exist.
- Use `409 Conflict` when the request conflicts with the current state of a resource.
- Use `500 Internal Server Error` for unexpected server errors.

## Security and authorization

- Protected endpoints require an authenticated user. JWT access tokens issued by
  an external identity provider are planned; Auth0 is the current candidate,
  subject to confirming the provider and its operational requirements before
  implementation.
- Document the authentication and authorization requirements for every endpoint.
  Explicitly identify public endpoints, such as health checks or API
  documentation, rather than assuming they are public.
- Return `401 Unauthorized` when credentials are missing or invalid, and
  `403 Forbidden` when an authenticated user lacks permission.
- Never include credentials, access tokens, or other secrets in API responses or
  logs. Do not expose internal authentication or authorization details.

### JWT access tokens

- Send access tokens using the `Authorization: Bearer <access-token>` header.
- Accept only access tokens issued for this API; do not accept ID tokens as API
  credentials.
- Validate the token signature, allowed signing algorithm, issuer, audience, and
  time claims, including expiration, before accepting it.
- Link an external identity to a local account using the validated issuer (`iss`)
  and subject (`sub`), not email alone. Do not store or validate user passwords
  in this API.
- A valid token establishes identity, not access to business data. Resolve
  account status, clinic memberships, and permissions from trusted local
  authorization data; never trust roles or clinic identifiers supplied only by
  the client.
- Do not send tokens in URLs or include them in logs or API responses. Use HTTPS
  for requests carrying tokens.
- Use the identity provider's documented signing-key discovery and rotation
  mechanisms. Do not hardcode signing secrets.

### Clinics, roles, and authorization

- Treat clinic-owned data as tenant-scoped: an authenticated user may access
  records only within a clinic to which they belong and are authorized.
- Determine the clinic scope from the authenticated user's authorized context.
  Do not rely solely on a client-supplied clinic identifier in a path, query, or
  request body to grant access.
- Evaluate authorization for the clinic relevant to each request, including
  when a user belongs to multiple clinics.
- Ensure that authorization checks prevent cross-clinic access, including for
  reads, updates, and deletes. Avoid revealing whether another clinic's
  resources exist.
- Sibling clinics may access only explicitly shared basic clinic information;
  membership in one clinic does not grant access to another clinic's pets,
  staff, or clinical records.
- Add tests for unauthenticated access, insufficient permissions, permitted
  clinic access, and cross-clinic access whenever protected routes are
  implemented.

The following initial roles are planned; refine their permissions as clinic
workflows are defined:

- `clinic_user`: may manage pets and clinical records within their authorized
  clinic.
- `clinic_admin`: has `clinic_user` permissions and may manage users and
  settings for their clinic.
- `group_admin`: may manage clinics within their group. Access to clinical
  records across clinics must be explicitly authorized and audited.
- `platform_admin`: platform-wide operational access is out of scope for the
  initial implementation.
- Do not introduce a global `admin` role by default. Keep clinic-level and
  group-level administration distinct from any future platform-wide
  administration.

## Request validation

- Validate all client-provided path parameters, query parameters, and request bodies.
- Document accepted formats, required fields, length limits, ranges, and allowed values for each endpoint.
- Return `400 Bad Request` when request data is invalid, using the standard error format described above.
- Do not expose internal implementation details in validation error messages.

## Filtering and sorting

- Pass filters and sorting options as query parameters.
- Each endpoint documents the filters and sorting options it supports.
- Filter values use the API's documented formats and enum values.
- Use a deterministic default sort order for collection endpoints.

## Pagination

- Use cursor-based pagination for collections that may grow large.
- Accept `limit` and `cursor` as query parameters; cursors are opaque to clients.
- Return paginated collections as an object containing `items`, `nextCursor`, and `hasMore`.
- Keep pagination order stable so clients can continue through the collection reliably.

## AI-generated content

- Clearly identify content generated by AI.
- Treat AI-generated reports as informational, not as veterinary diagnosis or treatment advice.
- Do not present generated conclusions as certain facts.
