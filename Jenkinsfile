pipeline {
    agent any

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
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
