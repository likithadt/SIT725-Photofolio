pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        script {
          docker.build('liki-proj-image')
        }
      }
    }
  }
}
