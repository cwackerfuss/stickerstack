import stripe

stripe.api_key = "sk_test_fc0heHRqHr9mMCIU6wPs6MoL"


def create_order(data):
    if not data['token']:
        return 'Error: no token supplied.'

    customer = stripe.Customer.create(source=data['token'])
    items = data['items']

    return 'ok'
