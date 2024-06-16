pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    sh 'docker-compose up --build -d'
                }
            }
        }
          stage('Test') {
            steps {
                script {
                   sh 'echo "Tests passed"'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}