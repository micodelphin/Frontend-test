const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student API',
            version: '1.0.0',
            description: 'API for managing students'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        paths: {
            '/getData': {
                get: {
                    summary: 'Get all students',
                    responses: {
                        200: { description: 'Success' }
                    }
                }
            },
            '/getDataById/{id}': {
                get: {
                    summary: 'Get student by ID',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' }
                        }
                    ],
                    responses: {
                        200: { description: 'Student retrieved successfully' }
                    }
                }
            },
            '/addStudent': {
                post: {
                    summary: 'Add a new student',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        place: { type: 'string' },
                                        phone: { type: 'integer' },
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Student added successfully' }
                    }
                }
            },
            '/addList': {
                post: {
                    summary: 'Add a list of students',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string'},
                                            id: { type: 'integer'}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Students added successfully' }
                    }
                }
            },
            '/updateStudent/{id}': {
                put: {
                    summary: 'Update a student',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Student updated successfully' }
                    }
                }
            },
            '/deleteDataById/{id}': {
                delete: {
                    summary: 'Delete student using async',
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'integer' }
                        }
                    ],
                    responses: {
                        200: { description: 'Successfully Deleted' }
                    }
                }
            },
            '/maxminValue': {
                get: {
                    summary: 'Get max and min student id',
                    responses: {
                        200: {
                            description: 'Success',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            min_value: { type: 'integer' },
                                            max_value: { type: 'integer' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/autopost': {
                post: {
                    summary: 'Add a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string'},
                                        email: { type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'User added successfully' }
                    }
                }
            }
        }
    },
    apis: [] 
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = { swaggerUi, swaggerSpec }