define( [ 'lodash' ], function( _ ) {

    return {
        RESTService: {
            'url': '',
            'dataType': 'json',
            'type': 'get',
            'echo': "{\"menu\": {\n    \"header\": \"HeaderText\",\n    \"true\": \"true\",\n    \"false\": \"false\",\n    \"items\": [\n        {\"id\": \"1\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [1,2,3]},\n        {\"id\": \"2\", \"label\": \"Tux\", \"img\": \"https://www.gstatic.com/webp/gallery3/2.png\", \"r\": [4,5,6]},\n        {\"id\": \"3\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [7,8,9]},\n        {\"id\": \"4\", \"label\": \"Tux\", \"img\": \"https://www.gstatic.com/webp/gallery3/2.png\", \"r\": [11,12,13]},\n        {\"id\": \"5\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [14,15,16]}\n    ]\n}}"
        },
        RESTService2: {
            'url': '',
            'dataType': 'json',
            'type': 'post',
            'echo': ""
        },
        configTest: {
            context: {
                right: "passed"
            },
            expression: {
                exp: "right",
                exp1: 'wrong',
                changeExp: "changed",
                addExp: "added",
                addValue: "new"

            },
            compareObj: {
                right: "changed",
                added: "new"
            }
        },
        helperTest: {
            pages: {
                page1: "testpage.html"
            },
            services: {
                service1: "testService",
                service2: "anotherService",
                toCompare: [
                    "testService",
                    "anotherService"
                ]
            },
            templates: {
                template: "{right}",
                result: "executed"
            }

        },
        EntityAPI: {
            type_$ref_models: {
                user: {
                    type: "object",
                    properties: {
                        "name": {
                            type: "string"
                        }
                    }
                },
                user_list_$ref: {
                    type: "array",
                    items: {
                        $ref: "user"
                    }
                },
                user_list_type: {
                    type: "array",
                    items: {
                        type: "user"
                    }
                },
                group: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        prop$ref: {
                            $ref: "user"
                        },
                        prop: {
                            type: "object",
                            properties: {
                                "list_type": {
                                    type: "array",
                                    items: {
                                        type: "user"
                                    }
                                },
                                list_ref: {
                                    type: "array",
                                    items: {
                                        $ref: "user"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            array_model: {
                "TestStruct": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "item_name": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            object_with_one_level_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "number": {
                            "type": "number"
                        },
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "boolean": {
                            "type": "boolean"
                        }
                    }
                }
            },
            object_with_one_level_Result: {
                title: "",
                "caption": "",
                "number": 0,
                arr: [],
                "boolean": false
            },
            list_of_types_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct3": {
                    "type": "object",
                    "properties": {
                        "num": {
                            "type": "number"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                }
            },
            lazy_init_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "object",
                            "properties": {
                                "struct": {
                                    "type": "TestStruct"
                                }
                            }
                        },
                        "data2": {
                            "type": "TestStruct"
                        }
                    }
                }
            },
            inner_tests: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "array",
                            "items": {
                                "type": "TestStruct"
                            }
                        }
                    }
                }
            },
            default_values_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "default": "test default string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "TestStruct",
                        }
                    }
                }
            },
            default_values_on_object_creation_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "default": "test default string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "TestStruct",
                        }
                    }
                }
            },

            dot_notation_Models: {
                "obj_simple": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "obj2": {
                    "type": "object",
                    "properties": {
                        "arr": {
                            "$ref": "nums"
                        }
                    }
                },
                "nums": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "obj": {
                    "type": "object",
                    "properties": {
                        "arr_in_obj": {
                            "$ref": "arr"
                        }
                    }
                },
                "arr": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "str": {
                                "type": "string"
                            }
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "test": {
                                        "type": "obj"
                                    }
                                }
                            }
                        }
                    }
                },
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "default": "test default string"
                                },
                                "caption": {
                                    "type": "string"
                                }
                            }
                        },
                        "number": {
                            "type": "number"
                        },
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "default": "test default string"
                                    },
                                    "caption": {
                                        "type": "string"
                                    },
                                    "test": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "a": {
                                                    "type": "string"
                                                },
                                                "b": {
                                                    "type": "string",
                                                    "default": "test b"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "boolean": {
                            "type": "boolean"
                        }
                    }
                },
                "User": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "id": {
                            "type": "number"
                        }
                    }
                },
                "UserList": {
                    "type": "array",
                    "items": {
                        "$ref": "User"
                    }
                }
            },
            xml_one_item_issue: {
                model: {
                    "TestStruct": {
                        "type": "object",
                        "properties": {
                            "prop": {
                                "type": "object",
                                "properties": {
                                    "other_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "item_name": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "second_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "item_name": {
                                                    "type": "string"
                                                },
                                                "obj": {
                                                    "type": "object",
                                                    "properties": {
                                                        "item_array": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "list": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "obj": {
                        "type": "object",
                        "properties": {
                            "arr_in_obj": {
                                "$ref": "arr"
                            }
                        }
                    },
                    "arr": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "str": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "TestStruct2": {
                        "type": "object",
                        "properties": {
                            "arr": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "test": {
                                            "type": "obj"
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
                default_value: {
                    first: {
                        prop: {
                            other_list: {
                                item_name: "should be an object inside one array item"
                            },
                            second_list: [ {
                                item_name: "1",
                                obj: {
                                    item_array: 10
                                }
                            }, {
                                item_name: "2",
                                obj: {
                                    item_array: [ 10, 20, 30, 40, 50 ]
                                }
                            } ]
                        },
                        list: "should be transform to array"
                    },
                    second: {
                        arr: {
                            test: {
                                arr_in_obj: {
                                    str: "should be property inside object in array item"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} );
