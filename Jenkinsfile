pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: playwright
      image: mcr.microsoft.com/playwright:v1.48.0-jammy
      command: ["cat"]
      tty: true
"""
            defaultContainer 'playwright'
        }
    }

    stages {
        stage("Check") {
            steps {
                sh "node -v"
                sh "npx playwright --version"
            }
        }
    }
}
