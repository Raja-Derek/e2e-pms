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
      resources:
        requests:
          cpu: "500m"
          memory: "1Gi"
        limits:
          cpu: "2"
          memory: "4Gi"
      securityContext:
        allowPrivilegeEscalation: false
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
