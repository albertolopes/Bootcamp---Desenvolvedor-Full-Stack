export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "description": "My app API description",
        "version": "1.0.0",
        "title": "My app API description"
    },
    "host": "localhost:4000",
    "tags": [
        {
            "name": "grade",
            "description": "Grade management"
        }
    ],
    "paths": {
        "/grade": {
            "get": {
                "tags": [
                    "grade"
                ],
                "summary": "Get existing grade",
                "description": "Get existing grade description",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "post": {
                "tags": [
                    "grade"
                ],
                "summary": "Create a new grade",
                "description": "Create a new grade with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grade object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Grade created"
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        }
    },
    "definitions": {
        "Account": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "Guilherme Assis"
                },
                "balance": {
                    "type": "integer",
                    "example": 742.34
                }
            }
        }
    }
};