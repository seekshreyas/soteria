1. Got rid of the following attributes: 
	1. `source_id`
	2. `summary`
	3. `related_incidents`
	4. `notes`
	5. `victim.locations_affected`, 
	6. `victim.notes`,
	7. `victim.revenue.iso_currency_code`
	8. `victim.secondary.amount`
	9. `victim.secondary.victim_id`
	10. `asset.management`
	11. `asset.notes`
	12. `attribute.confidentiality.notes`
	13. `attribute.confidentiality.state`
	14. `attribute.integrity.notes`
	15. `attribute.availability.duration.unit`
	16. `attribute.availability.duration.value`
	17. `attribute.availability.notes`
	18. `timeline.compromise.unit`
	19. `timeline.compromise.value`
	20. `timeline.containment.unit`
	21. `timeline.containment.value`
	22. `timeline.exfiltration.unit`
	23. `timeline.exfiltration.value`
	24. `targeted`
	25. `impact.iso_currency_code`
	26. `impact.notes`
	27. `impact.overall_amount`
	28. `impact.overall_min_amount`
	29. `impact.overall_rating`
	30. `plus.analysis_status`
	31. `plus.analyst`
	32. `plus.analyst_notes`
	33. `plus.asset.total`
	34. `plus.attribute.confidentiality.credit_monitoring`
	35. `plus.attribute.confidentiality.credit_monitoring_years`
	36. `plus.attribute.confidentiality.data_abuse`
	37. `plus.attribute.confidentiality.data_misuse`
	38. `plus.attribute.confidentiality.data_subject`
	39. `plus.attribute.confidentiality.partner_number`
	40. `plus.created`
	41. `plus.dbir_year`
	42. `plus.f500`
	43. `plus.github`
	44. `plus.issue_id`
	45. `plus.master_id`
	46. `plus.modified`
	47. `plus.timeline.notification.day`
	48. `plus.timeline.notification.month`
	49. `plus.timeline.notification.year`
	50. `data_total`
2. Converted the values in `victim.revenue.amount` column to be in terms of USD.
3. Combining the values in `timeline.discovery.unit` and `timeline.discovery.value`
	1. For unknown values:
		1. Seconds - Fill in with 1 Minute = 0.0007 day
		2. Minutes - Fill in with 30 Minutes = 0.021 day
		3. Hours - Fill in with 12 Hours = 0.5 day
		4. Days - Fill in 3.5 days
		4. Weeks - Fill in 14 days
		5. Months - Fill in 182 days
		6. Years - Fill in 365 days
4. Recoded `victim.industry` to represent the Industry instead of as a number.

Stopped at timeline