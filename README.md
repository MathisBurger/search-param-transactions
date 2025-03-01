# React router search param transactions

There is one big problem with React Routers `useSearchParams` hook. The hook does not allow multiple updates in a row without overwriting the made updates to other search params. 
If you have a setup with multiple hooks each for one search param and they all use the `useSearchParams` hook, you might run into this problem.
This problem is tackled by this library. 

The approach of this library is to implement transactions for search params. To you can use our internal hook for mutable search params and just use it without transactions, but if you need them, you can use them!


## Setup

First you will need to download the library by using 
```bash
npm i search-param-transactions
```

Then you need to add our transaction wrapper at the top of your application (e.g. app.tsx or main.tsx)

```tsx
import SearchParamTransactionWrapper from "search-param-transactions";

<SearchParamTransactionWrapper>
    Your children go here
</SearchParamTransactionWrapper>
```


## Usage

After the initial setup you can now go on using it.

There are two ways of using transactional search params:

### 1. `useMutableSearchParam` Hook

This hook provides the functionality of creating a getter and setter for a specific search param

```tsx
const [getter, setter] = useMutableSearchParam('searchParamName');
console.log(getter); // null
setter('foo');
console.log(getter); // "foo"
```
**NOTE:** This code does not use transactional behaviour yet. The update is executed immediately.

For transactional behaviour you will need to use this:

```tsx
const [getter, setter] = useMutableSearchParam('searchParamName');
const [getter2, setter2] = useMutableSearchParam('searchParamName2');
setter('foo', {noCommit: true}); // Data not commited yet
setter('bar'); // Commit happens here
```

### 2. `useTransactionalSearchParams` hook

For some more complex use cases where you need to go onto a lower level of abstraction, this hook might be the best way to go with.

```tsx
const [searchParams, updateParam, commit] = useTransactionalSearchParams();
```

`searchParams` is the search params object as a total that can be used like the object of the normal useSearchParams hook.

`updateParam` is a function that can be invoked to update a single search param. The change is not commited.

`commit` is a function that can be invoked to flush all updates made by the `updateParam` function.


## Further development

This library will be updated in the future if there are any wishes from the community. I am relatively active on GitHub. So just create an issue or a pull request and I will soon start working on it. 


## License

This application is MIT licensed.
