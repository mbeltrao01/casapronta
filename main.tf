provider "azurerm" {
  features {}
  subscription_id = "885ef135-459d-4221-a368-6d32018ff0b0"
}


resource "azurerm_resource_group" "rg" {
  name     = "rg-casapronta"
  location = "East US"
}

resource "azurerm_app_service_plan" "plan" {
  name                = "plan-casapronta"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "app" {
  name                = "app-casapronta"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.plan.id

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE" = "1"
  }
}
