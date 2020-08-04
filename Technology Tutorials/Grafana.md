# Grafana

## Concepts

A dashboard provides at-a-glance view of data and allows us to track metrics through different visualizations. 

Dashboards consist of **panels**, each representing a part of the story. 

Each panel consists of a **query** and a **visualisation**. The *query defines what data* the panel display. The *visualization defines how* the data is displayed. 

## Annotation

Annotations comments displayed on the panels. They can be added manually by clicking on the panel, or added automatically via queries. 

Automatic annotations can be added via the settings of the dashboard. 

## Alerts

Alerts consist of two parts:

- Notification channel: how the alert is delivered (e.g., email, slack)
- Alert rules: when the alert is triggered. They are conditions that are regularly evaluated by Grafana. 

