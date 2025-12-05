pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                    containers:
                      - name: playwright
                        image: mcr.microsoft.com/playwright:v1.42.0-jammy
                        command:
                            - cat
                        tty: true
                        volumeMounts:
                          - name: workspace-volume
                            mountPath: /home/jenkins/agent
                    volumes:
                      - name: workspace-volume
                        emptyDir: {}
                '''
            defaultContainer 'playwright'
        }
    }

    tools {
        nodejs 'node-18'   // gunakan Node yang sudah di-setup di Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
