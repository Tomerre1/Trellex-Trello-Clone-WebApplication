
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const demoBoards = [
    {
        "_id": "b101",
        "title": "Robot dev proj",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgClr": 'linear-gradient(to right, #2980b9, #2c3e50)',
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
                "imgUrl": ''
            },
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",

                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "labelIds": []
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "labelIds": []
                    },
                    {
                        id: 'c103',
                        title: 'Task 1',
                        description: 'Good',
                        comments: [],
                        checklists: [
                            {
                                id: "wquJCo",
                                title: "22",
                                todos: [{
                                    title: "Todo 1",
                                    id: "5eqZQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 2",
                                    id: "5wqZQb",
                                    isDone: false
                                },
                                {
                                    title: "Todo 3",
                                    id: "5wqpQb",
                                    isDone: false
                                }]
                            },
                            {
                                id: "wPuJCA",
                                title: "22",
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
                            _id: "60b910d79cd5fc23e7bf7c8e",
                            username: "yoni1234",
                            fullname: "Yoni Segev",
                            isAdmin: false,
                            createdAt: "2021-06-03T17:26:47.000Z",
                            imgUrl: "https://res.cloudinary.com/plcrased/image/upload/v1623092498/ldagsw7kikkt6fper6m9.jpg",
                            isOnline: false,
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
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "labelIds": ["l101", "l102"],

                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
                "txt": "Changed Color",
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
    {
        "_id": "b102",
        "title": "Adding more boards to see what it looks like",
        "createdAt": 1689983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgClr": 'linear-gradient(to right, #3494e6, #ec6ead)',
            "bgImg": ''
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "labelIds": [],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "labelIds": [],
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c1014",
                        "title": "Do that",
                        "labelIds": [],
                    },
                    {
                        "id": "c124",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }


        ]
    },
    {
        "_id": "b103",
        "title": "Board numero dos With A Much Longer Name To See How It Fits",
        "createdAt": 1689983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgClr": 'linear-gradient(to bottom, #000000, #434343)',
            "bgImg": ''
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "In Progress",
                "color": "purple"
            },
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c11241",
                        "title": "Replace logo",
                    },
                    {
                        "id": "c10asdf2",
                        "title": "Add Samples"
                    }

                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c10f3",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }


        ]
    },
    {
        "_id": "b104",
        "title": "More Boards!",
        "createdAt": 1689983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgClr": 'purple',
            "bgImg": 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg'
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    },
                    {
                        "id": "c103",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c105",
                        "title": "Add Samples"
                    },
                    {
                        "id": "c106",
                        "title": "Add Samples"
                    },
                    {
                        "id": "c107",
                        "title": "Add Samples"
                    },
                    {
                        "id": "c108",
                        "title": "Add Samples"
                    },
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g103",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g1034",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g134",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g106",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g107",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g108",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
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
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            },
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
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
    removeGroup
}
async function query() {
    let boards = await storageService.query(STORAGE_KEY)
    if (boards.length) return boards
    console.log('no local storage found')
    localStorage.setItem('board', JSON.stringify(demoBoards))
    return demoBoards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    try {
        return storageService.remove(STORAGE_KEY, boardId)
    } catch (err) {
        console.log('couldnt remove board',err)
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

function updateTask(board, group, task) {
    const groupIndex = board.groups.indexOf(group)
    const taskIndex = board.groups[groupIndex].tasks.indexOf(task)
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

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




