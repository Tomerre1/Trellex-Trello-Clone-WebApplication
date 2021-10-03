
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
// import Unsplash from 'unsplash-js';

// const unsplash = new Unsplash({
//     applicationId: "IwjSlLYB-kEXeOlDvuifDixGryX1CK64CwapeKeJC8w",
//     secret: "TcnJEr-I-fiU2Sk55F7LWMoL5qaXilbZU9v8ohbSCn4"
// });
const APP_ID = 'IwjSlLYB-kEXeOlDvuifDixGryX1CK64CwapeKeJC8w'

const demoBoards = [
    {
        "_id": "b101",
        "title": "Trellex dev proj",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": 'u101',
            "fullname": 'BCD',
            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
        },
        "style": {
            "bgClr": 'linear-gradient(to right, #2980b9, #2c3e50)',
            "bgImg": 'https://img2.goodfon.com/wallpaper/nbig/2/73/texture-lines-colours-cveta.jpg'
        },
        "labels": [
            {
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                title: "In Progress",
                color: "#ff9e1a",
                id: "l102"
            },
            {
                title: "High priority",
                color: "#eb5a46",
                id: "l103"
            },
            {
                title: "Low priority",
                color: "#b3bac5",
                id: "l104"
            },
            {
                title: "Design",
                color: "#c277e0",
                id: "l105"
            },
            {
                title: "Stuck",
                color: "#f2d600",
                id: "l106"
            },
            {
                title: "Important",
                color: "#eb5a46",
                id: "l107"
            },
            {
                title: "Commited to repository",
                color: "#ff78cb",
                id: "l108"
            },
            {
                title: "Waiting for feedback",
                color: "#334563",
                id: "l109"
            },
            {
                title: "has to be discussed",
                color: "#52e898",
                id: "l110"
            },


        ],
        "members": [
            {
                "_id": 'u101',
                "fullname": 'BCD',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
            },
            {
                "_id": 'u102',
                "fullname": 'Tomer',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
            },
            {
                "_id": 'u103',
                "fullname": 'Matan',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
            },
            {
                "fullname": 'Dave',
                "imgUrl": 'https://m.media-amazon.com/images/M/MV5BMTY5NzY4NzgxNV5BMl5BanBnXkFtZTcwMzcyOTQwOQ@@._V1_UY1200_CR108,0,630,1200_AL_.jpg',

                "_id": "u104"
            },
            {
                "fullname": 'Anna',
                "imgUrl": 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-2000w,f_auto,q_auto:best/newscms/2019_50/3139821/191209-ana_de_armas-mc-1505.JPG',
                "_id":"u105"
            }

        ],
        "groups": [
            {
                "id": "g101",
                "title": "To Do",

                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "labelIds": [
                            "l105"
                        ],
                        "members": [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "labelIds": []
                    },
                    {
                        id: 'c1023',
                        title: 'Task 1',
                        description: 'Good',
                        comments: [],
                        checklists: [
                            {
                                id: "wquJCo",
                                title: "Things to do",
                                todos: [{
                                    title: "Todo 1",
                                    id: "5eqZQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 2",
                                    id: "5wqZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 3",
                                    id: "5wqpQb",
                                    isDone: false
                                }]
                            },
                            {
                                id: "wPuJCA",
                                title: "More things to do",
                                todos: [{
                                    title: "Todo 11",
                                    id: "5eLLQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 22",
                                    id: "5PAZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 33",
                                    id: "5wlaQb",
                                    isDone: false
                                }]
                            }

                        ],
                        members: [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                        byMember: "loggedinUser",
                        labelIds: ['l101', 'l102', 'l103', 'l104', 'l105'],
                        createdAt: 1622913131548,
                        startDate: 0,
                        dueDate: 1624098480000,
                        attachments: [],
                        style: {
                            coverMode: "header",
                            bgImgUrl: "",
                            bgColor: "#60bd4f"
                        },
                        isDone: true
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "On going",
                "tasks": [
                    {
                        "id": "c1203",
                        "title": "Do that",
                        "labelIds": ["l101", "l102"],

                    },
                    {
                        "id": "c13023",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "KAPnm",
                                "txt": "Board is done",
                                "createdAt": 1632988079413,
                                "type": "comment",
                                "byMember": {
                                    "_id": "u101",
                                    "username": "BCD",
                                    "fullname": "Barak Sidi",
                                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                                },
                            },
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692515,
                                "type": "comment",
                                "byMember": {
                                    "_id": 'u103',
                                    "fullname": 'Matan',
                                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                                },
                            },
                            {
                                "id": "ZdPnl",
                                "txt": "Hey all, how’s it going?",
                                "createdAt": 1632937841235,
                                "type": "comment",
                                "byMember": {
                                    "_id": 'u102',
                                    "fullname": 'Tomer',
                                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                                },
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "123jX",
                                        "title": "To Do 2",
                                        "isDone": false
                                    },
                                    {
                                        "id": "212234",
                                        "title": "To Do 3",
                                        "isDone": true
                                    },
                                    {
                                        "id": "212dfjX",
                                        "title": "To Do 4",
                                        "isDone": false
                                    },
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1632987496504,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    },
                    {
                        "id": "c104fa",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692515,
                                "type": "comment",
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u101',
                                "fullname": 'BCD',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
                            },
                            {
                                "_id": 'u102',
                                "fullname": 'Tomer',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                            },
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1633187908796,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "due-date-complete",
                "type": "due-date-complete",
                "createdAt": 1632940470978,
                "byMember": {
                    "_id": 'u103',
                    "fullname": 'Matan',
                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                },
                "task": {
                    "id": "c13023",
                    "title": "Replace Logo",
                    "labelIds": []
                }
            },
            {
                "id": "a102",
                "txt": "due-date-complete",
                "type": "due-date-complete",
                "createdAt": 1545321314,
                "byMember": {
                    "_id": 'u103',
                    "fullname": 'Matan',
                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                },
                "task": {
                    "id": "c104fa",
                    "title": "Replace Logo22",
                    "labelIds": []
                }
            }


        ]
    },
    {
        "_id": "b102",
        "title": "Another Project",
        "createdAt": 1689983468418,
        "createdBy": {
            "_id": 'u101',
            "fullname": 'BCD',
            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
        },
        "style": {
            "bgClr": 'linear-gradient(to right, #2980b9, #2c3e50)',
            "bgImg": "https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
        },
        "labels": [
            {
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                title: "In Progress",
                color: "#ff9e1a",
                id: "l102"
            },
            {
                title: "High priority",
                color: "#eb5a46",
                id: "l103"
            },
            {
                title: "Low priority",
                color: "#b3bac5",
                id: "l104"
            },
            {
                title: "Design",
                color: "#c277e0",
                id: "l105"
            },
            {
                title: "Stuck",
                color: "#f2d600",
                id: "l106"
            },
            {
                title: "Important",
                color: "#eb5a46",
                id: "l107"
            },
            {
                title: "Commited to repository",
                color: "#ff78cb",
                id: "l108"
            },
            {
                title: "Waiting for feedback",
                color: "#334563",
                id: "l109"
            },
            {
                title: "has to be discussed",
                color: "#52e898",
                id: "l110"
            },


        ],
        "members": [
            {
                "_id": 'u101',
                "fullname": 'BCD',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
            },
            {
                "_id": 'u102',
                "fullname": 'Tomer',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
            },
            {
                "_id": 'u103',
                "fullname": 'Matan',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
            },
        ],
        "groups": [
            {
                "id": "g101",
                "title": "To Do",

                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "labelIds": [
                            "l105"
                        ],
                        "members": [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "labelIds": []
                    },
                    {
                        id: 'c1013',
                        title: 'Task 1',
                        description: 'Good',
                        comments: [],
                        checklists: [
                            {
                                id: "wquJCo",
                                title: "Things to do",
                                todos: [{
                                    title: "Todo 1",
                                    id: "5eqZQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 2",
                                    id: "5wqZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 3",
                                    id: "5wqpQb",
                                    isDone: false
                                }]
                            },
                            {
                                id: "wPuJCA",
                                title: "More things to do",
                                todos: [{
                                    title: "Todo 11",
                                    id: "5eLLQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 22",
                                    id: "5PAZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 33",
                                    id: "5wlaQb",
                                    isDone: false
                                }]
                            }

                        ],
                        members: [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                        byMember: "loggedinUser",
                        labelIds: ['l101', 'l102', 'l103', 'l104', 'l105'],
                        createdAt: 1622913131548,
                        startDate: 0,
                        dueDate: 1624098480000,
                        attachments: [],
                        style: {
                            coverMode: "header",
                            bgImgUrl: "",
                            bgColor: "#60bd4f"
                        },
                        isDone: true
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "On going",
                "tasks": [
                    {
                        "id": "c1023",
                        "title": "Do that",
                        "labelIds": ["l101", "l102"],

                    },
                    {
                        "id": "c1303",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692915,
                                "type": "comment",
                                "byMember": {
                                    "_id": 'u103',
                                    "fullname": 'Matan',
                                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                                },
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "123jX",
                                        "title": "To Do 2",
                                        "isDone": false
                                    },
                                    {
                                        "id": "212234",
                                        "title": "To Do 3",
                                        "isDone": true
                                    },
                                    {
                                        "id": "212dfjX",
                                        "title": "To Do 4",
                                        "isDone": false
                                    },
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1632988426504,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692515,
                                "type": "comment",
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u101',
                                "fullname": 'BCD',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
                            },
                            {
                                "_id": 'u102',
                                "fullname": 'Tomer',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                            },
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1632987626504,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "due-date-complete",
                "type": "due-date-complete",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c1024",
                    "title": "Replace Logo",
                    "labelIds": []
                }
            },
            {
                "id": "a101",
                "txt": "due-date-complete2",
                "type": "due-date-complete",
                "createdAt": 1789983468418,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c1023",
                    "title": "Replace Logo2",
                    "labelIds": []
                }
            }


        ]
    }, {
        "_id": "b103",
        "title": "And another one with a longer name !",
        "createdAt": 1789983468418,
        "createdBy": {
            "_id": 'u101',
            "fullname": 'BCD',
            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
        },
        "style": {
            "bgClr": "linear-gradient(to top, #0052d4, #4364f7, #6fb1fc)",
            "bgImg": ''
        },
        "labels": [
            {
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                title: "In Progress",
                color: "#ff9e1a",
                id: "l102"
            },
            {
                title: "High priority",
                color: "#eb5a46",
                id: "l103"
            },
            {
                title: "Low priority",
                color: "#b3bac5",
                id: "l104"
            },
            {
                title: "Design",
                color: "#c277e0",
                id: "l105"
            },
            {
                title: "Stuck",
                color: "#f2d600",
                id: "l106"
            },
            {
                title: "Important",
                color: "#eb5a46",
                id: "l107"
            },
            {
                title: "Commited to repository",
                color: "#ff78cb",
                id: "l108"
            },
            {
                title: "Waiting for feedback",
                color: "#334563",
                id: "l109"
            },
            {
                title: "has to be discussed",
                color: "#52e898",
                id: "l110"
            },


        ],
        "members": [
            {
                "_id": 'u101',
                "fullname": 'BCD',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
            },
            {
                "_id": 'u102',
                "fullname": 'Tomer',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
            },
            {
                "_id": 'u103',
                "fullname": 'Matan',
                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
            },
        ],
        "groups": [
            {
                "id": "g101",
                "title": "To Do",

                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "labelIds": [
                            "l105"
                        ],
                        "members": [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "labelIds": []
                    },
                    {
                        id: 'c23103',
                        title: 'Task 1',
                        description: 'Good',
                        comments: [],
                        checklists: [
                            {
                                id: "wquJCo",
                                title: "Things to do",
                                todos: [{
                                    title: "Todo 1",
                                    id: "5czZQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 2",
                                    id: "5wdZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 3",
                                    id: "5wqpQb",
                                    isDone: false
                                }]
                            },
                            {
                                id: "wPuJCA",
                                title: "More things to do",
                                todos: [{
                                    title: "Todo 11",
                                    id: "5eLLQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 22",
                                    id: "5PAZQb",
                                    isDone: true
                                },
                                {
                                    title: "Todo 33",
                                    id: "5wlaQb",
                                    isDone: false
                                }]
                            }

                        ],
                        members: [{
                            "_id": 'u101',
                            "fullname": 'BCD',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
                            "isAdmin": false,
                        }],
                        byMember: "loggedinUser",
                        labelIds: ['l101', 'l102', 'l103', 'l104', 'l105'],
                        createdAt: 1622913131548,
                        startDate: 0,
                        dueDate: 1624098480000,
                        attachments: [],
                        style: {
                            coverMode: "header",
                            bgImgUrl: "",
                            bgColor: "#60bd4f"
                        },
                        isDone: true
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "On going",
                "tasks": [
                    {
                        "id": "c341a03",
                        "title": "Do that",
                        "labelIds": ["l101", "l102"],

                    },
                    {
                        "id": "c1012f3",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPncm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692515,
                                "type": "comment",
                                "byMember": {
                                    "_id": 'u103',
                                    "fullname": 'Matan',
                                    "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                                },
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmaF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "21v2jX",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "123jX",
                                        "title": "To Do 2",
                                        "isDone": false
                                    },
                                    {
                                        "id": "212234",
                                        "title": "To Do 3",
                                        "isDone": true
                                    },
                                    {
                                        "id": "212dfjX",
                                        "title": "To Do 4",
                                        "isDone": false
                                    },
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1632988426504,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    },
                    {
                        "id": "c104d",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPdnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1632924692515,
                                "type": "comment",
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": 'u101',
                                "fullname": 'BCD',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
                            },
                            {
                                "_id": 'u102',
                                "fullname": 'Tomer',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                            },
                            {
                                "_id": 'u103',
                                "fullname": 'Matan',
                                "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew'
                            },
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 1632987526504,
                        "byMember": {
                            "_id": 'u102',
                            "fullname": 'Tomer',
                            "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg'
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "due-date-complete",
                "type": "due-date-complete",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo",
                    "labelIds": []
                }
            }


        ]
    },

]
const STORAGE_KEY = 'board'
// const listeners = []

export const boardService = {
    query,
    getById,
    save,
    remove,
    updateTask,
    addTask,
    removeTask,
    addGroup,
    removeGroup,
    createActivity,
    updateTaskByIds,
    queryPhotos
}
async function query() {
    let boards = await storageService.query(STORAGE_KEY)
    if (boards.length) return boards
    console.log('no local storage found')
    localStorage.setItem('board', JSON.stringify(demoBoards))
    return demoBoards
}

async function queryPhotos(query = 'random') {
    debugger;
    const photos = await httpService.get(`https://api.unsplash.com/search/photos/?query=dog&client_id=IwjSlLYB-kEXeOlDvuifDixGryX1CK64CwapeKeJC8w`)
    console.log('%c  photos:', 'color: #00000;background: #aaefe5;', photos);
    return photos;
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    try {
        return storageService.remove(STORAGE_KEY, boardId)
    } catch (err) {
        console.log('couldnt remove board', err)
    }
}

async function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        const newBoard = {
            "_id": utilService.makeId,
            "title": board.title,
            "createdAt": Date.now(),
            "createdBy": 'TEMP USER', // logged in user
            "groups": [],
            "tasks": [],
            "labels": [],
            "activities": [],
            "members": [],
            "style": {
                "bgClr": board.style.bgClr,
                "bgImg": board.style.bgImg
            },
        }
        return storageService.post(STORAGE_KEY, newBoard)
    }
}
function createActivity(activityType, currTask, txt = null) {
    const loggedinUser = {
        "_id": 'u101',
        "fullname": 'BCD',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo'
    }
    const task = {
        id: currTask.id,
        title: currTask.title
    }

    const activity = {

        id: utilService.makeId(),
        createdAt: Date.now(),
        // byMember: userService.getLoggedinUser(),
        byMember: loggedinUser,
        task,
        type: activityType,
        txt
    }

    // console.log('activity from service', activity)
    return activity
}

function updateTask(board, group, task) {
    const groupIndex = board.groups.indexOf(group)
    console.log('%c  groupIndex:', 'color: #00000;background: #aaefe5;', groupIndex);
    const taskNeedToUpdate = board.groups[groupIndex].tasks.find(currTask => currTask.id === task.id)
    const taskIndex = board.groups[groupIndex].tasks.indexOf(taskNeedToUpdate)
    console.log('%c  taskIndex:', 'color: #00000;background: #aaefe5;', taskIndex);
    board.groups[groupIndex].tasks[taskIndex] = task
    return { ...board }
}



async function addTask(taskTitle, boardId, groupId) {
    if (!taskTitle)
        return
    const newTask =
    {
        "id": `t-${utilService.makeId()}`,
        "title": taskTitle,
        "description": "",
        "createdAt": Date.now(),
        "byMember": {
            "_id": "u101",
            "username": "BCD",
            "fullname": "Barak Sidi",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        "style": {},
        "labelIds": []
    }
    const board = await getById(boardId)
    const idx = board.groups.findIndex((group) => group.id === groupId)
    board.groups[idx].tasks.push(newTask)
    save(board)
    return board
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => groupId === group.id)
        board.groups[groupIdx].tasks = board.groups[groupIdx].tasks.filter(task => taskId !== task.id)
        save(board)
        return board
    }

    catch (err) {
        console.log(err)
    }

}

async function addGroup(boardId, title = "Untitled group") {
    if (!boardId) return
    const newGroup = {
        "id": `g-${utilService.makeId()}`,
        "title": title,
        tasks: [],
        "style": {
            bgImg: "",
            bgClr: ""
        }
    }
    try {
        const board = await getById(boardId)
        board.groups.push(newGroup)
        save(board)

        return board
    }
    catch (err) {
        console.log('couldnt add group', err)
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        board.groups = board.groups.filter(group => group.id !== groupId)
        save(board)
        return board
    }

    catch (err) {
        console.log(err)
    }

}
async function updateTaskByIds(boardId, groupId, task) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(group => groupId === group.id)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(taskToFind => taskToFind.id === task.id)
    board.groups[groupIdx].tasks[taskIdx] = task
    save(board)
    return board

}

// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

// function subscribe(listener) {
//     listeners.push(listener)
// }

// function _notifySubscribersBoardsChanged(boards) {
//     console.log('Notifying Listeners');
//     listeners.forEach(listener => listener(boards))
// }

// window.addEventListener('storage', () => {
//     console.log('Storage Changed from another Browser!');
//     query()
//         .then(boards => {
//             _notifySubscribersBoardsChanged(boards)
//         }) 
// })