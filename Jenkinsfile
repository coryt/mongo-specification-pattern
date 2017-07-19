pipeline {
  agent none
  stages {
    stage('print stuff') {
      steps {
        echo 'stuff'
      }
    }
    stage('print more stuff') {
      steps {
        echo 'more stuff'
        echo '$id'
      }
    }
  }
  environment {
    id = '123'
  }
}