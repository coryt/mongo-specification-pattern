pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('') {
      steps {
        parallel(
          "print": {
            echo 'test'
            
          },
          "print 2": {
            echo 'test 2'
            
          }
        )
      }
    }
  }
}