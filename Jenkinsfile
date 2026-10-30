pipeline {
    agent any

    tools {
        maven 'Maven-3.10'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'ShopSphere source code checked out from GitHub.'
            }
        }

        stage('Verify Maven') {
            steps {
                bat 'mvn -version'
            }
        }

        stage('Build Maven Project') {
            steps {
                dir('java-service') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Archive JAR') {
            steps {
                archiveArtifacts artifacts: 'java-service/target/*.jar',
                                 fingerprint: true
            }
        }
    }
}
