# Cloud Native Application Architecture

An example of a cloud native application architecture using Kubernetes, Helm, Docker and Skaffold.

![Architecture](./assets/banner.jpg)

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)
- [Kind](https://kind.sigs.k8s.io/)
- [Node](https://nodejs.org/en/)

## Getting Started

1. Add useful repositories to Helm:

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm repo update
   ```

2. Start Skaffold in dev mode:

   ```bash
   skaffold dev --port-forward --status-check=false
   ```
