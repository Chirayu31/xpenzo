const apiCaller = {
  get: async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`Internal Server Error`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },

  post: async (url: string, body: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message ?? 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('Error posting data:', error)
      throw error
    }
  },

  put: async (url: string, body: any) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message ?? 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('Error updating data:', error)
      throw error
    }
  },

  delete: async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message ?? 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('Error deleting data:', error)
      throw error
    }
  },
}

export default apiCaller
