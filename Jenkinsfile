// pipeline {
//     agent {
//         docker { 
//             image 'node:18' // Use the same base image as in your Dockerfile
//             args '-u node' // Volume mapping if needed (optional)
//         }
//     }
//     stages {
//         stage('Build') {
//             steps {
//                 // Install dependencies
//                 sh 'npm install --only=production --log-level=verbose'
//             }
//         }
//         // stage('Test') {
//         //     steps {
//         //         // You can add tests here if needed
//         //         sh 'npm test'
//         //     }
//         // }
//         stage('Package') {
//             steps {
//                 script {
//                     // Build and tag the Docker image
//                     def app = docker.build('liki-app')
//                     app.push('latest') // Push the Docker image (requires Docker Hub or a registry)
//                 }
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 script {
//                     // Deploy the app (depends on your deployment method)
//                     sh 'docker run -p 3000:3000 my-nodejs-app'
//                 }
//             }
//         }
//     }
// }


pipeline {
    environment {
    registry = "mohansaikiran/sit753-app"
    registryCredential = 'dockerhubdredentials'
    dockerImage = ''
    }

    agent any
    stages {
            stage('Cloning our Git') {
                steps {
                    git branch: 'main', url: 'https://github.com/mohansaikiran/SIT725-Photofolio.git'
                }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        dockerImage = docker.build registry + ":$BUILD_NUMBER"
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        withDockerRegistry([ credentialsId: registryCredential, url: 'https://index.docker.io/v1/' ]) {
                        // docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }

            stage('Cleaning Up') {
                steps{
                  sh "docker rmi --force $registry:$BUILD_NUMBER"
                }
            }
        }
    }
