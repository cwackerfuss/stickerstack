import stripe

stripe.api_key = "sk_test_fc0heHRqHr9mMCIU6wPs6MoL"


def create_order(data):
    if not data['token']:
        return 'Error: no token supplied.'

    customer = stripe.Customer.create(source=data['token'])

    cus_info = customer['sources']['data'][0]
    shipping = {
        "name": cus_info['name'],
        "address": {
            "line1": cus_info['address_line1'],
            "city": cus_info['address_city'],
            "country": cus_info['address_country'],
            "postal_code": cus_info['address_zip']
        },
    }

    items = data['items']
    items_list = [{'type': 'sku', 'parent': sku} for sku in items]

    stripe.Order.create(
        currency='usd',
        items=items_list,
        customer=customer.id,
        shipping=shipping,
        email=data['email']
    )

    return 'ok'
