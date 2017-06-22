'use strict';
import React from 'react'

export default class RepositoriesService {

    static getRepositoriesByUser(userName) {
        const url = 'https://api.github.com/users/' + userName + '/repos';
        console.log("get users by url: " + url);
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

}