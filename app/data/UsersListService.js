'use strict';
import React from 'react'

export default class UsersListService {

    static getUsersByQuery(query) {
        let url = 'https://api.github.com/search/users?q=' + query;
        console.log("get users by url: " + url);
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => responseJson.items)
    }

}