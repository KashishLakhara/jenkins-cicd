pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kashiish19/my-nodejs-app:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/KashishLakhara/jenkins-cicd'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop my-nodejs-app || true && docker rm my-nodejs-app || true'
            }
        }

        stage('Deploy New Container from Docker Hub') {
            steps {
                sh 'docker pull $DOCKER_IMAGE'
                sh 'docker run -d -p 3000:3000 --name my-nodejs-app $DOCKER_IMAGE'
            }
        }
    }
}

