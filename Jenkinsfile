pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                metadata:
                labels:
                    agent: jenkins
                spec:
                containers:
                - name: docker
                    image: docker:24.0.7-dind
                    command:
                    - dockerd-entrypoint.sh
                    tty: true
                    securityContext:
                    privileged: true
                    env:
                    - name: DOCKER_TLS_CERTDIR
                    value: ""
                - name: kubectl
                    image: alpine/k8s:1.28.3
                    command:
                    - cat
                    tty: true
                volumes: []
                '''
        }
    }

    tools {
        nodejs 'node-18'   // gunakan Node yang sudah di-setup di Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Raja-Derek/e2e-pms'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install -D ts-node typescript'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=line,junit,html'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'playwright-report/**/*.xml'
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    allowMissing: false,
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                    ]
                )
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
