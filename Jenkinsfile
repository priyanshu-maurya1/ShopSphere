pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'ShopSphere source code is available from GitHub.'
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
