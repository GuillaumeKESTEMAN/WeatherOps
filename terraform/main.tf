provider "supabase" {
  api_key = var.supabase_api_key
}

resource "supabase_project" "my_project" {
  name   = "WeatherOps"
  region = "us"
}

resource "supabase_database" "my_database" {
  project_id = "xwyffegxdegmnuxqqfoo"
  name       = "eu-west-3"
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend"
    labels = {
      App = "backend"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        App = "backend"
      }
    }

    template {
      metadata {
        labels = {
          App = "backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = "backend"

          env {
            name  = "SUPABASE_URL"
            value = "https://xwyffegxdegmnuxqqfoo.supabase.co"
          }

          env {
            name  = "SUPABASE_ANON_KEY"
            value = var.supabase_anon_key
          }

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend_service" {
  metadata {
    name = "backend-service"
  }

  spec {
    selector = {
      App = "backend"
    }

    port {
      port        = 80
      target_port = 30002
    }

    type = "NodePort"
  }
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"
    labels = {
      App = "frontend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        App = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          App = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "frontend"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend_service" {
  metadata {
    name = "frontend-service"
  }

  spec {
    selector = {
      App = "frontend"
    }

    port {
      port        = 80
      target_port = 30001
    }

    type = "NodePort"
  }
}
