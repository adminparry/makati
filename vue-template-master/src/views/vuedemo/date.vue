<template>
    <div>
        <h1>{{new Date() | date('yyyy-MM-dd hh:mm:ss.S')}}</h1>
        <h1>{{new Date() | date('yyyy-MM-dd E hh:mm:ss.S')}}</h1>
        <h1>{{new Date() | date('yyyy-MM-dd EE hh:mm:ss.S')}}</h1>
        <h1>{{new Date() | date('yyyy-MM-dd EEE hh:mm:ss')}}</h1>
        <h1>{{new Date() | date('yyyy-M-d h:m:s.S')}}</h1>
    </div>
    
</template>