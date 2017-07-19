pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('print stuff') {
      steps {
        echo 'stuff'
      }
    }
    stage('print more stuff') {
      steps {
        echo 'more stuff'
      }
    }
  }
  environment {
    id = '123'
  }
}